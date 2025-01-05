import { type Address, erc20Abi, createPublicClient, http, Abi } from "viem";
import {
  getSupportedChain,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseRawAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { TypedRpcApiKeys } from "@/sdk/client";
import { getSupportedToken, NULL_ADDRESS } from "@/sdk/constants";
import { ContractMap } from "../contracts";
import {
  CompleteMarketDataType,
  getCompleteMarketQueryFunction,
} from "./get-complete-market";
import { getTokenQuotesQueryFunction } from "./get-token-quotes";
import { extractTokenQuote } from "../hooks/use-token-quotes";
import { BigNumber } from "ethers";
import {
  TypedMarketActionIncentiveDataElement,
  TypedMarketActionInputTokenData,
} from "../hooks/use-prepare-market-action/types";

export type GetVaultPreviewIncentivesQueryParams = {
  chain_id: number;
  vault_address: string;
  incentive_ids: string[];
  quantity: string;
  completeMarket: Awaited<ReturnType<typeof getCompleteMarketQueryFunction>>;
  tokenQuotes: Awaited<ReturnType<typeof getTokenQuotesQueryFunction>>;
};

export type GetVaultPreviewIncentivesQueryOptionsParams = {
  RPC_API_KEYS: TypedRpcApiKeys;
} & GetVaultPreviewIncentivesQueryParams;

export const getVaultPreviewIncentivesQueryFunction = async ({
  chain_id,
  vault_address,
  quantity,
  incentive_ids,
  RPC_API_KEYS,
  completeMarket,
  tokenQuotes,
}: GetVaultPreviewIncentivesQueryOptionsParams) => {
  try {
    if (!completeMarket) {
      throw new Error("Market not found");
    }

    const chainClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: getSupportedChain(chain_id),
      transport: http(RPC_API_KEYS[chain_id]),
    });

    const contracts = incentive_ids
      .map((incentive_id) => {
        const token_data = getSupportedToken(incentive_id);

        return [
          {
            address: vault_address as Address,
            abi: ContractMap[chain_id as keyof typeof ContractMap][
              "WrappedVault"
            ].abi as Abi,
            functionName: "rewardToInterval",
            args: [token_data.contract_address as Address],
          },
          {
            address: vault_address as Address,
            abi: ContractMap[chain_id as keyof typeof ContractMap][
              "WrappedVault"
            ].abi as Abi,
            functionName: "previewRateAfterDeposit",
            args: [token_data.contract_address as Address, quantity],
          },
        ];
      })
      .flat();

    const query = await chainClient.multicall({ contracts });

    // Get input token quote
    const input_token_quote = extractTokenQuote({
      token_id: completeMarket?.input_token_id ?? "",
      token_quotes: tokenQuotes,
    });

    // Get input token data
    const input_token_data: TypedMarketActionInputTokenData = {
      ...input_token_quote,
      raw_amount: quantity,
      token_amount: parseRawAmountToTokenAmount(
        quantity,
        input_token_quote.decimals,
      ),
      token_amount_usd: parseRawAmountToTokenAmountUsd(
        quantity,
        input_token_quote.decimals,
        input_token_quote.price,
      ),
    };

    const incentiveData = incentive_ids.map((incentive_token_id, index) => {
      const reward_interval = query[index * 2]?.result
        ? (query[index * 2]?.result as string[])
        : ["0", "0"];

      const start_timestamp = parseRawAmount(reward_interval[0] ?? "0");
      const end_timestamp = parseRawAmount(reward_interval[1] ?? "0");

      const curr_timestamp = parseRawAmount(
        Math.floor(Date.now() / 1000).toString(),
      );

      let lockup_time = 0;

      let incentive_token_raw_amount = "0";

      if (BigNumber.from(curr_timestamp).lt(BigNumber.from(end_timestamp))) {
        let from_time = BigNumber.from(curr_timestamp);

        if (
          BigNumber.from(curr_timestamp).lt(BigNumber.from(start_timestamp))
        ) {
          from_time = BigNumber.from(start_timestamp);
        }

        lockup_time = Number(
          BigNumber.from(end_timestamp).sub(from_time).toString(),
        );

        const time_left = parseRawAmount(
          BigNumber.from(end_timestamp).sub(from_time).toString(),
        );

        const scaled_reward_amount_per_input_asset_per_second = parseRawAmount(
          query[index * 2 + 1]?.result?.toString() ?? "0",
        );

        const reward_amount_per_second = parseRawAmount(
          BigNumber.from(scaled_reward_amount_per_input_asset_per_second)
            .mul(BigNumber.from(quantity))
            .div(BigNumber.from(10).pow(18))
            .toString(),
        );

        // Get incentive token raw amount
        incentive_token_raw_amount = parseRawAmount(
          BigNumber.from(reward_amount_per_second)
            .mul(BigNumber.from(time_left))
            .toString(),
        );
      }

      // Get incentive token quote
      const incentive_token_quote = extractTokenQuote({
        token_id: incentive_token_id,
        token_quotes: tokenQuotes,
      });

      // Get incentive token amount
      const incentive_token_amount = parseRawAmountToTokenAmount(
        incentive_token_raw_amount,
        incentive_token_quote.decimals,
      );

      // Get incentive token amount in USD
      const incentive_token_amount_usd = parseRawAmountToTokenAmountUsd(
        incentive_token_raw_amount,
        incentive_token_quote.decimals,
        incentive_token_quote.price,
      );

      // Get per input token
      const per_input_token =
        incentive_token_amount / input_token_data.token_amount;

      // Get annual change ratio
      let annual_change_ratio = 0;

      const quantity_value_usd = input_token_data.token_amount_usd;
      const incentive_value_usd = incentive_token_amount_usd;

      if (quantity_value_usd > 0 && !isNaN(lockup_time) && lockup_time > 0) {
        annual_change_ratio =
          (incentive_value_usd / quantity_value_usd) *
          ((365 * 24 * 60 * 60) / lockup_time);
      }

      // Get incentive token data
      const incentive_token_data = {
        ...incentive_token_quote,
        raw_amount: incentive_token_raw_amount,
        token_amount: incentive_token_amount,
        token_amount_usd: incentive_token_amount_usd,
        per_input_token,
        annual_change_ratio,
      };

      return incentive_token_data;
    });

    return {
      inputTokenData: input_token_data,
      incentiveData,
    };
  } catch (err) {
    const input_token_data: TypedMarketActionInputTokenData = {
      ...getSupportedToken(NULL_ADDRESS),
      raw_amount: "0",
      token_amount: 0,
      token_amount_usd: 0,
      price: 0,
      fdv: 0,
      total_supply: 0,
    };

    const incentiveData: Array<TypedMarketActionIncentiveDataElement> = [];

    return {
      inputTokenData: input_token_data,
      incentiveData,
    };
  }
};

export const getVaultPreviewIncentivesQueryOptions = ({
  RPC_API_KEYS,
  chain_id,
  vault_address,
  incentive_ids,
  quantity,
  completeMarket,
  tokenQuotes,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  vault_address: string;
  incentive_ids: string[];
  quantity: string;
  completeMarket: Awaited<ReturnType<typeof getCompleteMarketQueryFunction>>;
  tokenQuotes: Awaited<ReturnType<typeof getTokenQuotesQueryFunction>>;
}) => ({
  queryKey: [
    "get-vault-preview-incentives",
    {
      chain_id,
      vault_address,
      incentive_ids,
      quantity,
      completeMarket,
      tokenQuotes,
    },
  ],
  queryFn: () =>
    getVaultPreviewIncentivesQueryFunction({
      RPC_API_KEYS,
      chain_id,
      vault_address,
      incentive_ids,
      quantity,
      completeMarket,
      tokenQuotes,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

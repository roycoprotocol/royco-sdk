import type { TypedRoycoClient, TypedRpcApiKeys } from "@/sdk/client";
import type { SupportedToken } from "@/sdk/constants";
import type { CustomTokenData, RPC_API_KEYS_OBJECT_TYPE } from "@/sdk/types";
import type { Abi, Address } from "viem";
import type { UseQueryOptions } from "@tanstack/react-query";

import { ContractMap } from "@/sdk/contracts";
import { getSupportedToken } from "@/sdk/constants";
import {
  getChain,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { http } from "viem";
import { createPublicClient } from "viem";

export type EnrichedAccountBalanceVaultInMarketDataType = {
  input_token_data_ap: SupportedToken & {
    raw_amount: string;
    token_amount: number;
    token_amount_usd: number;
    shares: number;
  };

  input_token_data_ip: SupportedToken & {
    raw_amount: string;
    token_amount: number;
    token_amount_usd: number;
  };

  incentives_ap_data: Array<
    SupportedToken & {
      raw_amount: string;
      token_amount: number;
      token_amount_usd: number;
    }
  >;

  incentives_ip_data: Array<
    SupportedToken & {
      raw_amount: string;
      token_amount: number;
      token_amount_usd: number;
    }
  >;

  balance_usd_ap: number;
  balance_usd_ip: number;
};

export const getEnrichedAccountBalancesVaultInMarketQueryOptions = (
  client: TypedRoycoClient,
  RPC_API_KEYS: TypedRpcApiKeys,
  chain_id: number,
  market_id: string,
  account_address: string,
  custom_token_data?: CustomTokenData,
) => ({
  queryKey: [
    "enriched-account-balance-vault-in-market",
    chain_id,
    market_id,
    account_address,
    ...(custom_token_data || []).map(
      (token) =>
        `${token.token_id}-${token.price}-${token.fdv}-${token.total_supply}`,
    ),
  ],
  queryFn: async () => {
    const result = await client.rpc(
      "get_enriched_account_balances_vault_in_market",
      {
        in_chain_id: chain_id,
        in_market_id: market_id,
        in_account_address: account_address,
        custom_token_data,
      },
    );

    if (result.data && result.data.length > 0) {
      const rows = result.data;
      const row = rows[0];

      if (!row) {
        return null;
      }

      // Get the chain
      const chain = getChain(chain_id);

      // Create the public client
      const publicClient = createPublicClient({
        chain,
        transport: http(RPC_API_KEYS[chain_id]),
      });

      // Create the contracts array for incentives
      const incentives_ap_contracts = row.incentives_ids_ap.map(
        (incentiveId) => ({
          address: market_id as Address,
          abi: ContractMap[chain_id as keyof typeof ContractMap]["WrappedVault"]
            .abi as Abi,
          functionName: "currentUserRewards",
          args: [incentiveId.split("-")[1], account_address],
        }),
      );

      // Get the raw incentives amount for AP
      const raw_incentives_amount_ap_data = await publicClient.multicall({
        contracts: incentives_ap_contracts,
      });

      const incentives_ap_data = row.incentives_ids_ap.map(
        (incentiveId, incentiveIndex) => {
          const token_info: SupportedToken = getSupportedToken(incentiveId);

          const raw_amount = parseRawAmount(
            raw_incentives_amount_ap_data[incentiveIndex]?.result?.toString() ??
              "0",
          );

          const token_amount: number = parseRawAmountToTokenAmount(
            raw_amount,
            token_info.decimals,
          );

          const token_amount_usd = parseTokenAmountToTokenAmountUsd(
            token_amount,
            row.incentives_price_values_ap[incentiveIndex] ?? 0,
          );

          return {
            ...token_info,
            raw_amount,
            token_amount,
            token_amount_usd,
          };
        },
      );

      const incentives_ip_data = row.incentives_ids_ip.map(
        (incentiveId, incentiveIndex) => {
          const token_info: SupportedToken = getSupportedToken(incentiveId);
          const raw_amount: string = parseRawAmount(
            row.incentives_amount_ip[incentiveIndex],
          );

          const token_amount: number = parseRawAmountToTokenAmount(
            row.incentives_amount_ip[incentiveIndex],
            token_info.decimals,
          );

          const token_amount_usd = parseTokenAmountToTokenAmountUsd(
            token_amount,
            row.incentives_price_values_ip[incentiveIndex] ?? 0,
          );

          return {
            ...token_info,
            raw_amount,
            token_amount,
            token_amount_usd,
          };
        },
      );

      // Get the input token info
      const input_token_info: SupportedToken = getSupportedToken(
        row.input_token_id,
      );

      const raw_input_token_amount_ap_data = await publicClient.multicall({
        contracts: [
          {
            address: market_id as Address,
            abi: ContractMap[chain_id as keyof typeof ContractMap][
              "WrappedVault"
            ].abi as Abi,
            functionName: "convertToAssets",
            args: [row.quantity_ap],
          },
        ],
      });

      const raw_input_token_amount_ap = parseRawAmount(
        raw_input_token_amount_ap_data[0]?.status === "success"
          ? raw_input_token_amount_ap_data[0]?.result?.toString() ?? "0"
          : "0",
      );

      const input_token_data_ap = {
        ...input_token_info,
        raw_amount: raw_input_token_amount_ap,
        token_amount: parseRawAmountToTokenAmount(
          raw_input_token_amount_ap,
          input_token_info.decimals,
        ),
        token_amount_usd: parseTokenAmountToTokenAmountUsd(
          parseRawAmountToTokenAmount(
            raw_input_token_amount_ap,
            input_token_info.decimals,
          ),
          row.input_token_price,
        ),
        shares: row.quantity_ap,
      };

      const input_token_data_ip = {
        ...input_token_info,
        raw_amount: row.quantity_ip,
        token_amount: parseRawAmountToTokenAmount(
          row.quantity_ip,
          input_token_info.decimals,
        ),
        token_amount_usd: parseTokenAmountToTokenAmountUsd(
          parseRawAmountToTokenAmount(
            row.quantity_ip,
            input_token_info.decimals,
          ),
          row.input_token_price,
        ),
      };

      const balance_usd_ap =
        incentives_ap_data.reduce((acc, cur) => acc + cur.token_amount_usd, 0) +
        input_token_data_ap.token_amount_usd;

      const balance_usd_ip =
        input_token_data_ip.token_amount_usd +
        incentives_ip_data.reduce((acc, cur) => acc + cur.token_amount_usd, 0);

      return {
        ...row,
        input_token_data_ap,
        input_token_data_ip,
        incentives_ap_data,
        incentives_ip_data,
        balance_usd_ap,
        balance_usd_ip,
      };
    }

    return null;
  },

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

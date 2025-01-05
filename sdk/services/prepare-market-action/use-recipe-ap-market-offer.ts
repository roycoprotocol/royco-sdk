import { type Address } from "viem";
import {
  getCompleteMarketQueryFunction,
  getMarketOffersQueryFunction,
  getTokenQuotesQueryFunction,
  getVaultTokenBalanceQueryFunction,
  getWalletTokenBalanceQueryFunction,
} from "@/sdk/queries";
import type { TransactionOptionsType } from "@/sdk/types";

import { RoycoMarketType, RoycoMarketUserType } from "@/sdk/market";
import {
  isSolidityAddressValid,
  isSolidityIntValid,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseRawAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { NULL_ADDRESS } from "@/sdk/constants";
import { ContractMap } from "@/sdk/contracts";
import {
  useTokenQuotes,
  useMarketOffers,
  extractTokenQuote,
  useCompleteMarket,
  useWalletTokenBalance,
  useVaultTokenBalance,
} from "@/sdk/hooks";

import { z, ZodError } from "zod";
import { useRpcApiKeys } from "@/sdk/client";
import type {
  TypedMarketActionIncentiveDataElement,
  TypedMarketActionInputTokenData,
} from "./types";
import { useMarketTokenApprovalContractOptions } from "./use-market-token-approval-contract-options";
import { checkFundingVaultBalance } from "./check-funding-vault-balance";
import { BigNumber } from "ethers";

export const recipeAPMarketOfferSchema = z.object({
  quantity: z
    .string()
    .refine((val) => isSolidityIntValid("uint256", val), "Quantity is invalid")
    .refine(
      (val) => BigNumber.from(val).gt(0),
      "Quantity must be greater than 0",
    ),
  funding_vault: z
    .string()
    .refine(
      (val) => isSolidityAddressValid("address", val),
      "Funding vault is invalid",
    ),
});

export const calculateRecipeAPMarketOfferTokenData = ({
  completeMarket,
  marketOffers,
  tokenQuotes,
}: {
  completeMarket: Awaited<ReturnType<typeof getCompleteMarketQueryFunction>>;
  marketOffers: Awaited<ReturnType<typeof getMarketOffersQueryFunction>>;
  tokenQuotes: Awaited<ReturnType<typeof getTokenQuotesQueryFunction>>;
}) => {
  const total_quantity_filled: string =
    marketOffers
      ?.reduce(
        (acc, offer) => acc.add(BigNumber.from(offer.fill_quantity)),
        BigNumber.from(0),
      )
      ?.toString() ?? "0";

  let incentiveData: Array<TypedMarketActionIncentiveDataElement> = [];

  // Get market offers
  const market_offers = marketOffers ?? [];

  // Get the token ID to amount map
  const token_id_to_amount_map =
    market_offers.reduce(
      (acc, offer) => {
        offer.token_ids.forEach((token_id, index) => {
          const base_amount: BigNumber = BigNumber.from(
            offer.token_amounts?.[index]?.toString() ?? "0",
          );

          const actual_amount: BigNumber = base_amount
            .mul(BigNumber.from(offer.fill_quantity))
            .div(BigNumber.from(offer.quantity));

          if (acc[token_id]) {
            acc[token_id] = acc[token_id].add(actual_amount);
          } else {
            acc[token_id] = actual_amount; // Initialize with the BigNumber amount
          }
        });
        return acc;
      },
      {} as Record<string, BigNumber>,
    ) ?? {};

  // Get the unique token IDs
  const action_incentive_token_ids = Object.keys(token_id_to_amount_map);

  // Get input token quote
  const input_token_quote = extractTokenQuote({
    token_id: completeMarket?.input_token_id ?? "",
    token_quotes: tokenQuotes,
  });

  // Get input token data
  const input_token_data: TypedMarketActionInputTokenData = {
    ...input_token_quote,
    raw_amount: total_quantity_filled,
    token_amount: parseRawAmountToTokenAmount(
      total_quantity_filled,
      input_token_quote.decimals,
    ),
    token_amount_usd: parseRawAmountToTokenAmountUsd(
      total_quantity_filled,
      input_token_quote.decimals,
      input_token_quote.price,
    ),
  };

  // Calculate incentive data
  incentiveData = action_incentive_token_ids.map((incentive_token_id) => {
    // Get incentive token quote
    const incentive_token_quote = extractTokenQuote({
      token_id: incentive_token_id,
      token_quotes: tokenQuotes,
    });

    // Get incentive token raw amount
    const incentive_token_raw_amount: string =
      token_id_to_amount_map[incentive_token_id].toString();

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

    const lockup_time = Number(completeMarket?.lockup_time ?? "0");
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
    incentiveData,
    inputTokenData: input_token_data,
  };
};

export const getRecipeAPMarketOfferTransactionOptions = ({
  chain_id,
  offer_ids,
  fill_amounts,
  funding_vault,
  frontend_fee_recipient,
}: {
  chain_id: number;
  offer_ids: string[];
  fill_amounts: string[];
  funding_vault: string;
  frontend_fee_recipient: string;
}) => {
  // Get contract address and ABI
  const address =
    ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
      .address;
  const abi =
    ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"].abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "RecipeMarketHub",
    chainId: chain_id,
    id: "fill_ip_offers",
    label: "Fill IP Offers",
    address: address as Address,
    abi,
    functionName: "fillIPOffers",
    marketType: RoycoMarketType.recipe.id,
    args: [offer_ids, fill_amounts, funding_vault, frontend_fee_recipient],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

export const isRecipeAPMarketOfferValid = ({
  quantity,
  funding_vault,
  walletTokenBalance,
  vaultTokenBalance,
  completeMarket,
}: {
  quantity: string;
  funding_vault: string;
  walletTokenBalance: Awaited<
    ReturnType<typeof getWalletTokenBalanceQueryFunction>
  > | null;
  vaultTokenBalance: Awaited<
    ReturnType<typeof getVaultTokenBalanceQueryFunction>
  > | null;
  completeMarket: Awaited<
    ReturnType<typeof getCompleteMarketQueryFunction>
  > | null;
}) => {
  try {
    // Validate schema
    recipeAPMarketOfferSchema.parse({ quantity, funding_vault });

    // Check funding vault balance
    checkFundingVaultBalance({
      quantity,
      funding_vault,
      walletTokenBalance,
      vaultTokenBalance,
      completeMarket,
    });

    return { status: true, message: "Valid offer" };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: false,
        message: error.errors[0]?.message ?? "Invalid input",
      };
    }
    return {
      status: false,
      message: (error as Error)?.message ?? "Invalid input",
    };
  }
};

export const getRecipeAPMarketOfferCompletionStatus = ({
  quantity,
  fillQuantity,
  walletTokenBalance,
  vaultTokenBalance,
  completeMarket,
  funding_vault,
}: {
  quantity: string;
  fillQuantity: string;
  walletTokenBalance: Awaited<
    ReturnType<typeof getWalletTokenBalanceQueryFunction>
  > | null;
  vaultTokenBalance: Awaited<
    ReturnType<typeof getVaultTokenBalanceQueryFunction>
  > | null;
  completeMarket: Awaited<
    ReturnType<typeof getCompleteMarketQueryFunction>
  > | null;
  funding_vault: string;
}) => {
  const fillRequested = parseRawAmount(quantity);
  const fillAvailable = parseRawAmount(fillQuantity);

  // Initial status based on fill amounts
  let status = {
    canBePerformedCompletely: false,
    canBePerformedPartially: false,
  };

  // Early return if either amount is zero or negative
  if (
    BigNumber.from(fillAvailable).lte(0) ||
    BigNumber.from(fillRequested).lte(0)
  ) {
    status.canBePerformedCompletely = false;
    status.canBePerformedPartially = false;
    return status;
  }

  // Set status based on fill amounts comparison
  const hasEnoughFill = BigNumber.from(fillRequested).lte(
    BigNumber.from(fillAvailable),
  );
  status = {
    canBePerformedCompletely: hasEnoughFill,
    canBePerformedPartially: true,
  };

  // Check balance constraints
  let hasSufficientBalance = true;

  if (funding_vault === NULL_ADDRESS && !!walletTokenBalance) {
    // Source of funds is wallet
    if (
      BigNumber.from(walletTokenBalance.raw_amount ?? "0").lt(
        BigNumber.from(fillRequested),
      )
    ) {
      hasSufficientBalance = false;
    }
  } else if (funding_vault !== NULL_ADDRESS && !!vaultTokenBalance) {
    // Source of funds is vault
    if (
      vaultTokenBalance.contract_address !==
        completeMarket?.input_token_data.contract_address ||
      BigNumber.from(vaultTokenBalance.raw_amount ?? "0").lt(
        BigNumber.from(fillRequested),
      )
    ) {
      hasSufficientBalance = false;
    }
  }

  // If balance is insufficient, neither complete nor partial execution is possible
  if (!hasSufficientBalance) {
    status.canBePerformedCompletely = false;
    status.canBePerformedPartially = false;
  }

  return status;
};

export const useRecipeAPMarketOffer = ({
  account,
  chain_id,
  market_id,
  quantity,
  funding_vault,
  custom_token_data,
  frontend_fee_recipient,
  enabled,
}: {
  account: string | undefined;
  chain_id: number;
  market_id: string;
  quantity: string | undefined;
  funding_vault: string | undefined;
  custom_token_data?: Array<{
    token_id: string;
    price?: string;
    fdv?: string;
    total_supply?: string;
  }>;
  frontend_fee_recipient?: string;
  enabled?: boolean;
}) => {
  const RPC_API_KEYS = useRpcApiKeys();

  let preContractOptions: TransactionOptionsType[] = [];
  let postContractOptions: TransactionOptionsType[] = [];
  let writeContractOptions: TransactionOptionsType[] = [];

  const propsCompleteMarket = useCompleteMarket({
    chain_id,
    market_type: RoycoMarketType.recipe.value,
    market_id,
  });

  const propsMarketOffers = useMarketOffers({
    chain_id,
    market_type: RoycoMarketType.recipe.value,
    market_id,
    offer_side: RoycoMarketUserType.ip.value,
    quantity: quantity ?? "0",
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const propsTokenQuotes = useTokenQuotes({
    token_ids: [
      propsCompleteMarket.data?.input_token_id ?? "",
      ...(propsMarketOffers.data?.flatMap((offer) => offer.token_ids) ?? []),
    ],
    custom_token_data,
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const { inputTokenData, incentiveData } =
    calculateRecipeAPMarketOfferTokenData({
      completeMarket: propsCompleteMarket.data ?? null,
      marketOffers: propsMarketOffers.data ?? null,
      tokenQuotes: propsTokenQuotes.data ?? [],
    });

  const propsWalletTokenBalance = useWalletTokenBalance({
    chain_id,
    account_address: account ?? "",
    token_address:
      propsCompleteMarket.data?.input_token_data.contract_address ?? "",
    enabled:
      enabled === true &&
      funding_vault === NULL_ADDRESS &&
      !!propsCompleteMarket.data,
  });

  const propsVaultTokenBalance = useVaultTokenBalance({
    chain_id,
    vault_address: funding_vault ?? "",
    account_address: account ?? "",
    enabled:
      enabled === true &&
      funding_vault !== NULL_ADDRESS &&
      !!propsCompleteMarket.data,
  });

  const isValid = isRecipeAPMarketOfferValid({
    quantity: quantity ?? "0",
    funding_vault: funding_vault ?? NULL_ADDRESS,
    walletTokenBalance: propsWalletTokenBalance.data ?? null,
    vaultTokenBalance: propsVaultTokenBalance.data ?? null,
    completeMarket: propsCompleteMarket.data ?? null,
  });

  const propsMarketTokenApprovalContractOptions =
    useMarketTokenApprovalContractOptions({
      market_type: RoycoMarketType.recipe.id,
      token_ids: [propsCompleteMarket.data?.input_token_id ?? ""],
      required_approval_amounts: [quantity ?? "0"],
      funding_vault: funding_vault ?? NULL_ADDRESS,
      spender:
        ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
          .address ?? "",
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      account_address: account ?? "",
    });

  preContractOptions = propsMarketTokenApprovalContractOptions.data ?? [];

  let offerTxOptions: TransactionOptionsType =
    getRecipeAPMarketOfferTransactionOptions({
      chain_id,
      offer_ids: propsMarketOffers.data?.map((offer) => offer.offer_id) ?? [],
      fill_amounts:
        propsMarketOffers.data?.map((offer) => offer.fill_quantity) ?? [],
      funding_vault: funding_vault ?? NULL_ADDRESS,
      frontend_fee_recipient:
        frontend_fee_recipient ??
        propsCompleteMarket.data?.protocol_fee_recipient ??
        NULL_ADDRESS,
    });

  postContractOptions = [
    {
      ...offerTxOptions,
      tokensOut: [inputTokenData],
    },
  ];

  writeContractOptions = [...preContractOptions, ...postContractOptions];

  let { canBePerformedCompletely, canBePerformedPartially } =
    getRecipeAPMarketOfferCompletionStatus({
      quantity: quantity ?? "0",
      fillQuantity:
        propsMarketOffers.data?.reduce((acc, offer) => {
          return BigNumber.from(acc).add(BigNumber.from(offer.fill_quantity));
        }, "0") ?? "0",
      walletTokenBalance: propsWalletTokenBalance.data ?? null,
      vaultTokenBalance: propsVaultTokenBalance.data ?? null,
      completeMarket: propsCompleteMarket.data ?? null,
      funding_vault: funding_vault ?? NULL_ADDRESS,
    });

  const isLoading =
    propsCompleteMarket.isLoading ||
    propsTokenQuotes.isLoading ||
    propsWalletTokenBalance.isLoading ||
    propsVaultTokenBalance.isLoading ||
    propsMarketOffers.isLoading ||
    propsMarketTokenApprovalContractOptions.isLoading;

  return {
    isLoading,
    isValid,
    canBePerformedCompletely,
    canBePerformedPartially,
    inputTokenData,
    incentiveData,
    writeContractOptions,
  };
};

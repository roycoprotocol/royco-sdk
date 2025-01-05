import { type Address } from "viem";
import {
  getCompleteMarketQueryFunction,
  getMarketOffersQueryFunction,
  getTokenQuotesQueryFunction,
  getVaultTokenBalanceQueryFunction,
  getWalletTokenBalanceQueryFunction,
  getWalletTokensBalanceQueryFunction,
} from "@/sdk/queries";
import type { CustomTokenData, TransactionOptionsType } from "@/sdk/types";

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
  useMarketOffersValidator,
  useWalletTokensBalance,
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
import React from "react";

export const recipeIPMarketOfferSchema = z.object({
  quantity: z
    .string()
    .refine((val) => isSolidityIntValid("uint256", val), "Quantity is invalid")
    .refine(
      (val) => BigNumber.from(val).gt(0),
      "Quantity must be greater than 0",
    ),
});

export const calculateRecipeIPMarketOfferTokenData = ({
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
  let incentiveDataWithFees: Array<TypedMarketActionIncentiveDataElement> = [];

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

  // Calculate incentive data with fees
  incentiveDataWithFees = action_incentive_token_ids.map(
    (incentive_token_id) => {
      // Get incentive token quote
      const incentive_token_quote = extractTokenQuote({
        token_id: incentive_token_id,
        token_quotes: tokenQuotes,
      });

      // Get incentive token raw amount without fees
      const incentive_token_raw_amount_without_fees: string =
        token_id_to_amount_map[incentive_token_id].toString();

      // Get protocol fee
      const protocol_fee = BigNumber.from(
        incentive_token_raw_amount_without_fees,
      )
        .mul(BigNumber.from(completeMarket?.protocol_fee ?? 0))
        .div(BigNumber.from(10).pow(18));

      // Get frontend fee
      const frontend_fee = BigNumber.from(
        incentive_token_raw_amount_without_fees,
      )
        .mul(BigNumber.from(completeMarket?.frontend_fee ?? 0))
        .div(BigNumber.from(10).pow(18));

      // Get incentive token raw amount with fees
      const incentive_token_raw_amount = BigNumber.from(
        incentive_token_raw_amount_without_fees,
      )
        .add(protocol_fee)
        .add(frontend_fee)
        .toString();

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
    },
  );

  return {
    incentiveData,
    inputTokenData: input_token_data,
    incentiveDataWithFees,
  };
};

export const getRecipeIPMarketOfferTransactionOptions = ({
  chain_id,
  offers,
  fill_amounts,
  frontend_fee_recipient,
}: {
  chain_id: number;
  offers: Array<{
    offerID: string;
    targetMarketHash: string;
    ap: string;
    fundingVault: string;
    quantity: string;
    expiry: string;
    incentivesRequested: string[];
    incentiveAmountsRequested: string[];
  }>;
  fill_amounts: string[];
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
    id: "fill_ap_offers",
    label: "Fill AP Offers",
    address: address as Address,
    abi,
    functionName: "fillAPOffers",
    marketType: RoycoMarketType.recipe.id,
    args: [offers, fill_amounts, frontend_fee_recipient],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

export const isRecipeIPMarketOfferValid = ({
  quantity,
}: {
  quantity: string;
}) => {
  try {
    // Validate schema
    recipeIPMarketOfferSchema.parse({ quantity });

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

export const getRecipeIPMarketOfferCompletionStatus = ({
  quantity,
  fillQuantity,
  tokenAmounts,
  walletTokensBalance,
}: {
  quantity: string;
  fillQuantity: string;
  walletTokensBalance: Awaited<
    ReturnType<typeof getWalletTokensBalanceQueryFunction>
  > | null;
  tokenAmounts: string[];
}) => {
  const fillRequested = parseRawAmount(quantity);
  const fillAvailable = parseRawAmount(fillQuantity);

  // Initial status based on fill amounts
  let status = {
    canBePerformedCompletely: true,
    canBePerformedPartially: true,
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

  if (!!walletTokensBalance) {
    // Use a for...of loop instead of forEach
    for (let i = 0; i < walletTokensBalance.length; i++) {
      const token = walletTokensBalance[i];

      if (token && token.type === "point") {
        continue;
      }

      if (
        token &&
        BigNumber.from(token.raw_amount ?? "0").lt(
          BigNumber.from(tokenAmounts[i] ?? "0"),
        )
      ) {
        hasSufficientBalance = false;
        break;
      }
    }
  }

  // If balance is insufficient, neither complete nor partial execution is possible
  if (!hasSufficientBalance) {
    status.canBePerformedCompletely = false;
    status.canBePerformedPartially = false;
  }

  return status;
};

export const useRecipeIPMarketOffer = ({
  account,
  chain_id,
  market_id,
  quantity,
  custom_token_data,
  frontend_fee_recipient,
  offer_validation_url,
  incentive_asset_ids,
  enabled,
}: {
  account: string | undefined;
  chain_id: number;
  market_id: string;
  quantity: string | undefined;
  custom_token_data?: CustomTokenData;
  frontend_fee_recipient?: string;
  offer_validation_url: string;
  incentive_asset_ids?: string[];
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
    offer_side: RoycoMarketUserType.ap.value,
    quantity: quantity ?? "0",
    incentive_ids: incentive_asset_ids,
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  // Get market offers validator
  const propsMarketOffersValidator = useMarketOffersValidator({
    offer_ids: propsMarketOffers.data?.map((offer) => offer.id) ?? [],
    offerValidationUrl: offer_validation_url,
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  // Trigger refetch when validator returns non-empty array
  React.useEffect(() => {
    if (
      !propsMarketOffersValidator.isLoading &&
      propsMarketOffersValidator.data &&
      propsMarketOffersValidator.data.length > 0
    ) {
      propsMarketOffers.refetch();
    }
  }, [propsMarketOffersValidator.isLoading, propsMarketOffersValidator.data]);

  const propsTokenQuotes = useTokenQuotes({
    token_ids: Array.from(
      new Set([
        propsCompleteMarket.data?.input_token_id ?? "",
        ...(propsMarketOffers.data?.flatMap((offer) => offer.token_ids) ?? []),
      ]),
    ),
    custom_token_data,
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const { inputTokenData, incentiveData, incentiveDataWithFees } =
    calculateRecipeIPMarketOfferTokenData({
      completeMarket: propsCompleteMarket.data ?? null,
      marketOffers: propsMarketOffers.data ?? null,
      tokenQuotes: propsTokenQuotes.data ?? [],
    });

  const propsWalletTokensBalance = useWalletTokensBalance({
    chain_id,
    account_address: account ?? "",
    token_addresses: incentiveDataWithFees.map(
      (incentive) => incentive.contract_address,
    ),
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const isValid = isRecipeIPMarketOfferValid({
    quantity: quantity ?? "0",
  });

  const propsMarketTokenApprovalContractOptions =
    useMarketTokenApprovalContractOptions({
      market_type: RoycoMarketType.recipe.id,
      token_ids: incentiveDataWithFees.map((incentive) => incentive.id),
      required_approval_amounts: incentiveDataWithFees.map(
        (incentive) => incentive.raw_amount,
      ),
      funding_vault: NULL_ADDRESS,
      spender:
        ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
          .address ?? "",
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      account_address: account ?? "",
    });

  preContractOptions = propsMarketTokenApprovalContractOptions.data ?? [];

  let offerTxOptions: TransactionOptionsType =
    getRecipeIPMarketOfferTransactionOptions({
      chain_id,
      offers:
        propsMarketOffers.data?.map((offer) => ({
          offerID: offer.offer_id,
          targetMarketHash: offer.market_id,
          ap: offer.creator,
          fundingVault: offer.funding_vault,
          quantity: offer.quantity,
          expiry: offer.expiry,
          incentivesRequested: offer.token_ids.map((token_id) => {
            const token_address = token_id.split("-")[1] ?? NULL_ADDRESS;
            return token_address;
          }),
          incentiveAmountsRequested: offer.token_amounts,
        })) ?? [],
      fill_amounts:
        propsMarketOffers.data?.map((offer) => offer.fill_quantity) ?? [],
      frontend_fee_recipient:
        frontend_fee_recipient ??
        propsCompleteMarket.data?.protocol_fee_recipient ??
        NULL_ADDRESS,
    });

  postContractOptions = [
    {
      ...offerTxOptions,
      tokensOut: incentiveDataWithFees,
    },
  ];

  writeContractOptions = [...preContractOptions, ...postContractOptions];

  let { canBePerformedCompletely, canBePerformedPartially } =
    getRecipeIPMarketOfferCompletionStatus({
      quantity: quantity ?? "0",
      fillQuantity:
        propsMarketOffers.data?.reduce((acc, offer) => {
          return BigNumber.from(acc).add(BigNumber.from(offer.fill_quantity));
        }, "0") ?? "0",
      walletTokensBalance: propsWalletTokensBalance.data ?? null,
      tokenAmounts: incentiveDataWithFees.map(
        (incentive) => incentive.raw_amount,
      ),
    });

  const isLoading =
    propsCompleteMarket.isLoading ||
    propsTokenQuotes.isLoading ||
    propsWalletTokensBalance.isLoading ||
    propsMarketOffers.isLoading ||
    propsMarketOffersValidator.isLoading ||
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

import type { Address } from "viem";
import type { EnrichedMarketDataType } from "@/sdk/queries";
import type { TransactionOptionsType } from "@/sdk/types";
import type { ReadMarketDataType } from "@/sdk/hooks";

import React from "react";

import { BigNumber } from "ethers";
import { RoycoMarketType, RoycoMarketUserType } from "@/sdk/market";
import {
  isSolidityIntValid,
  parseRawAmountToTokenAmount,
  parseRawAmountToTokenAmountUsd,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";
import {
  getTokenQuote,
  useTokenQuotes,
  useMarketOffers,
  useMarketOffersValidator,
} from "@/sdk/hooks";
import { ContractMap } from "@/sdk/contracts";

import type {
  TypedMarketActionIncentiveDataElement,
  TypedMarketActionInputTokenData,
} from "./types";
import { useDefaultMarketData } from "./use-default-market-data";
import { NULL_ADDRESS } from "@/sdk/constants";

export const isVaultIPMarketOfferValid = ({
  quantity,
  enabled,
}: {
  quantity: string | undefined;
  enabled?: boolean;
}) => {
  try {
    // Check if enabled
    if (!enabled) {
      throw new Error("Market action is not enabled");
    }

    // Check quantity
    if (!quantity) {
      throw new Error("Quantity is missing");
    }

    // Check quantity for validity
    if (!isSolidityIntValid("uint256", quantity)) {
      throw new Error("Quantity is invalid");
    }

    // Check quantity is greater than 0
    if (BigNumber.from(quantity).lte(0)) {
      throw new Error("Quantity must be greater than 0");
    }

    return {
      status: true,
      message: "Valid market action",
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message
        ? (error.message as string)
        : "Invalid market action",
    };
  }
};

export const calculateVaultIPMarketOfferTokenData = ({
  baseMarket,
  enrichedMarket,
  propsMarketOffers,
  propsTokenQuotes,
  enabled,
}: {
  baseMarket: ReadMarketDataType | undefined;
  enrichedMarket: EnrichedMarketDataType | undefined;
  propsMarketOffers: ReturnType<typeof useMarketOffers>;
  propsTokenQuotes: ReturnType<typeof useTokenQuotes>;
  enabled?: boolean;
}) => {
  // Check if enabled
  if (!enabled) {
    return {
      incentiveData: [],
      inputTokenData: undefined,
    };
  }

  const total_quantity_filled: string =
    propsMarketOffers.data
      ?.reduce(
        (acc, offer) => acc.add(BigNumber.from(offer.fill_quantity)),
        BigNumber.from(0),
      )
      ?.toString() ?? "0";

  let incentiveData: Array<TypedMarketActionIncentiveDataElement> = [];

  // Get market offers
  const market_offers = propsMarketOffers.data ?? [];

  // Get the token ID to amount map
  const token_id_to_amount_map =
    market_offers.reduce(
      (acc, offer) => {
        offer.token_ids.forEach((token_id, index) => {
          const base_amount: BigNumber = BigNumber.from(
            offer.token_amounts[index]?.toString() ?? "0",
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
  const input_token_quote = getTokenQuote({
    token_id: enrichedMarket?.input_token_id ?? "",
    token_quotes: propsTokenQuotes,
  });

  // Get input token data
  const input_token_data: TypedMarketActionInputTokenData = {
    ...input_token_quote,
    raw_amount: total_quantity_filled ?? "0",
    token_amount: parseRawAmountToTokenAmount(
      total_quantity_filled ?? "0",
      input_token_quote.decimals,
    ),
    token_amount_usd: parseRawAmountToTokenAmountUsd(
      total_quantity_filled ?? "0",
      input_token_quote.decimals,
      input_token_quote.price,
    ),
  };

  if (!!enrichedMarket) {
    // Calculate incentive data
    incentiveData = action_incentive_token_ids.map((incentive_token_id) => {
      // Get incentive token quote
      const incentive_token_quote = getTokenQuote({
        token_id: incentive_token_id,
        token_quotes: propsTokenQuotes,
      });

      // Get incentive token raw amount
      const incentive_token_raw_amount =
        token_id_to_amount_map[incentive_token_id].toString();

      // Get incentive token amount
      const incentive_token_amount = parseRawAmountToTokenAmount(
        incentive_token_raw_amount ?? "0",
        incentive_token_quote.decimals,
      );

      // Get incentive token amount in USD
      const incentive_token_amount_usd = parseTokenAmountToTokenAmountUsd(
        incentive_token_amount,
        incentive_token_quote.price,
      );

      // Get per input token
      const per_input_token =
        incentive_token_amount / input_token_data.token_amount;

      // Get annual change ratio
      let annual_change_ratio = 0;

      let rate_usd = incentive_token_amount_usd;
      let locked_quantity_usd = enrichedMarket.locked_quantity_usd ?? 0;

      if (locked_quantity_usd > 0) {
        annual_change_ratio =
          (rate_usd / locked_quantity_usd) * (365 * 24 * 60 * 60);
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
  }

  return {
    incentiveData,
    inputTokenData: input_token_data,
  };
};

export const getVaultIPMarketOfferTransactionOptions = ({
  chain_id,
  offers,
  fill_amounts,
}: {
  chain_id: number;
  offers: Array<{
    offerID: string;
    targetVault: string;
    ap: string;
    fundingVault: string;
    expiry: string;
    incentivesRequested: string[];
    incentivesRatesRequested: string[];
  }>;
  fill_amounts: string[];
}) => {
  // Get contract address and ABI
  const address =
    ContractMap[chain_id as keyof typeof ContractMap]["VaultMarketHub"].address;
  const abi =
    ContractMap[chain_id as keyof typeof ContractMap]["VaultMarketHub"].abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "VaultMarketHub",
    chainId: chain_id,
    id: "allocate_ap_offers",
    label: "Allocate AP Offers",
    address: address as Address,
    abi,
    functionName: "allocateOffers",
    marketType: RoycoMarketType.vault.id,
    args: [offers, fill_amounts],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

export const useVaultIPMarketOffer = ({
  account,
  chain_id,
  market_id,
  quantity,
  custom_token_data,
  frontend_fee_recipient,
  offer_validation_url,
  enabled,
}: {
  account: string | undefined;
  chain_id: number;
  market_id: string;
  quantity: string | undefined;
  custom_token_data?: Array<{
    token_id: string;
    price?: string;
    fdv?: string;
    total_supply?: string;
  }>;
  frontend_fee_recipient?: string;
  offer_validation_url: string;
  enabled?: boolean;
}) => {
  let preContractOptions: TransactionOptionsType[] = [];
  let postContractOptions: TransactionOptionsType[] = [];
  let writeContractOptions: TransactionOptionsType[] = [];
  let canBePerformedCompletely: boolean = false;
  let canBePerformedPartially: boolean = false;

  const {
    baseMarket,
    enrichedMarket,
    isLoading: isLoadingDefaultMarketData,
  } = useDefaultMarketData({
    chain_id,
    market_id,
    market_type: RoycoMarketType.vault.id,
    enabled,
  });

  // Check if market action is valid
  const isValid = isVaultIPMarketOfferValid({
    quantity,
    enabled,
  });

  // Get market offers
  const propsMarketOffers = useMarketOffers({
    chain_id,
    market_type: RoycoMarketType.vault.value,
    market_id,
    offer_side: RoycoMarketUserType.ap.value,
    quantity: quantity ?? "0",
    incentive_ids: enrichedMarket?.base_incentive_ids ?? undefined,
    incentive_amounts: enrichedMarket?.base_incentive_rates ?? undefined,
    enabled: isValid.status,
  });

  // Get market offers validator
  const propsMarketOffersValidator = useMarketOffersValidator({
    offer_ids: propsMarketOffers.data?.map((offer) => offer.id) ?? [],
    offerValidationUrl: offer_validation_url,
    enabled: isValid.status,
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

  // Get token quotes
  const propsTokenQuotes = useTokenQuotes({
    token_ids: Array.from(
      new Set([
        enrichedMarket?.input_token_id ?? "",
        ...(propsMarketOffers.data?.flatMap((offer) => offer.token_ids) ?? []),
      ]),
    ),
    custom_token_data,
    enabled:
      isValid.status &&
      // Only proceed if validation is complete and returned empty array (all offers valid)
      !propsMarketOffersValidator.isLoading &&
      propsMarketOffersValidator.data?.length === 0,
  });

  // Get incentive data
  const { incentiveData, inputTokenData } =
    calculateVaultIPMarketOfferTokenData({
      baseMarket,
      enrichedMarket,
      propsMarketOffers,
      propsTokenQuotes,
      enabled: isValid.status,
    });

  // Create transaction options
  if (
    isValid.status &&
    !!baseMarket &&
    !!enrichedMarket &&
    !!incentiveData &&
    !!inputTokenData
  ) {
    // Get offer transaction options
    const offerTxOptions: TransactionOptionsType =
      getVaultIPMarketOfferTransactionOptions({
        chain_id,
        offers:
          propsMarketOffers.data?.map((offer) => ({
            offerID: offer.offer_id,
            targetVault: offer.market_id,
            ap: offer.creator,
            fundingVault: offer.funding_vault,
            expiry: offer.expiry,
            incentivesRequested: offer.token_ids.map((token_id) => {
              const token_address = token_id.split("-")[1] ?? NULL_ADDRESS;
              return token_address;
            }),
            incentivesRatesRequested: offer.token_amounts,
          })) ?? [],
        fill_amounts:
          propsMarketOffers.data?.map((offer) => offer.fill_quantity) ?? [],
      });

    // Set offer transaction options
    postContractOptions = [
      {
        ...offerTxOptions,
        tokensIn: [inputTokenData],
      },
    ];
  }

  if (postContractOptions.length > 0) {
    // Refine transaction options
    writeContractOptions = [...postContractOptions];
  }

  // Check if loading
  const isLoading =
    isLoadingDefaultMarketData ||
    propsMarketOffers.isLoading ||
    propsTokenQuotes.isLoading;

  // Check if ready
  const isReady = writeContractOptions.length > 0;

  // Check if offer can be performed completely or partially
  if (isReady) {
    if (BigNumber.from(inputTokenData?.raw_amount ?? 0).lte(0)) {
      canBePerformedCompletely = false;
      canBePerformedPartially = false;
    } else if (
      BigNumber.from(inputTokenData?.raw_amount ?? 0).eq(
        BigNumber.from(quantity ?? 0),
      )
    ) {
      canBePerformedCompletely = true;
      canBePerformedPartially = true;
    } else {
      canBePerformedCompletely = false;
      canBePerformedPartially = true;
    }
  }

  return {
    isValid,
    isLoading,
    isReady,
    incentiveData,
    writeContractOptions,
    canBePerformedCompletely,
    canBePerformedPartially,
  };
};

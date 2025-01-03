import {
  createPublicClient,
  erc20Abi,
  erc4626Abi,
  http,
  type Address,
} from "viem";
import {
  getEnrichedMarketsQueryFunction,
  getMarketOffersQueryFunction,
  getTokenQuotesQueryFunction,
  type EnrichedMarketDataType,
} from "@/sdk/queries";
import type { TransactionOptionsType } from "@/sdk/types";
import { getReadMarketQueryFunction, ReadMarketDataType } from "@/sdk/queries";

import React from "react";

import { BigNumber, ethers } from "ethers";
import {
  RoycoMarketType,
  RoycoMarketUserType,
  TypedRoycoMarketType,
} from "@/sdk/market";
import {
  getSupportedChain,
  isSolidityAddressValid,
  isSolidityIntValid,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseRawAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { getSupportedToken, NULL_ADDRESS } from "@/sdk/constants";
import { ContractMap } from "@/sdk/contracts";
import {
  useTokenAllowance,
  useVaultAllowance,
  getTokenQuote,
  useTokenQuotes,
  useMarketOffers,
  useMarketOffersValidator,
  extractTokenQuote,
} from "@/sdk/hooks";

import { z, ZodError } from "zod";
import { TypedRpcApiKeys, useRoycoClient, useRpcApiKeys } from "@/sdk/client";
import { RoycoClient, TypedRoycoClient } from "@/sdk/client";
import type {
  TypedMarketActionIncentiveDataElement,
  TypedMarketActionInputTokenData,
} from "./types";
import {
  hasWalletBalance,
  hasVaultBalance,
  getTokenApprovalContractOptions,
} from "./utils";
import { useQuery } from "@tanstack/react-query";

export const getRecipeAPMarketOfferSchema = ({
  RPC_API_KEYS,
  chain_id,
  account_address,
  enriched_market,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
  enriched_market: EnrichedMarketDataType;
}) => {
  return z
    .object({
      quantity: z
        .string()
        .refine(
          (val) => isSolidityIntValid("uint256", val),
          "Quantity is invalid",
        )
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
    })
    .refine(async (ctx) => {
      if (ctx.funding_vault === NULL_ADDRESS) {
        const input_token = getSupportedToken(
          enriched_market.input_token_id ?? "",
        );

        return hasWalletBalance({
          RPC_API_KEYS,
          chain_id,
          account_address,
          target_address: input_token.contract_address,
          required_balance: ctx.quantity,
        });
      }
    }, "Insufficient balance in wallet")
    .refine(async (ctx) => {
      if (ctx.funding_vault !== NULL_ADDRESS) {
        const input_token = getSupportedToken(
          enriched_market.input_token_id ?? "",
        );

        return hasVaultBalance({
          RPC_API_KEYS,
          chain_id,
          account_address,
          target_address: ctx.funding_vault,
          required_asset: input_token.contract_address,
          required_balance: ctx.quantity,
        });
      }
    }, "Insufficient balance in vault");
};

export const calculateRecipeAPMarketOfferTokenData = ({
  baseMarket,
  enrichedMarket,
  marketOffers,
  tokenQuotes,
}: {
  baseMarket: Awaited<ReturnType<typeof getReadMarketQueryFunction>>;
  enrichedMarket: EnrichedMarketDataType | undefined;
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
    token_id: enrichedMarket?.input_token_id ?? "",
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

    const lockup_time = Number(enrichedMarket?.lockup_time ?? "0");
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

export const getRecipeAPMarketOffer = async ({
  client,
  RPC_API_KEYS,
  account,
  chain_id,
  market_id,
  quantity,
  funding_vault,
  custom_token_data,
  frontend_fee_recipient,
  enabled,
}: {
  client: TypedRoycoClient;
  RPC_API_KEYS: TypedRpcApiKeys;
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
  let preContractOptions: TransactionOptionsType[] = [];
  let postContractOptions: TransactionOptionsType[] = [];
  let writeContractOptions: TransactionOptionsType[] = [];
  let canBePerformedCompletely: boolean = false;
  let canBePerformedPartially: boolean = false;

  const market_type = RoycoMarketType.recipe.value;
  const offer_side = RoycoMarketUserType.ip.value;

  const [baseMarket, enrichedMarkets, marketOffers] = await Promise.all([
    getReadMarketQueryFunction({
      RPC_API_KEYS,
      chain_id,
      market_type,
      market_id,
    }),
    getEnrichedMarketsQueryFunction({
      client,
      RPC_API_KEYS,
      chain_id,
      market_type,
      market_id,
    }),
    getMarketOffersQueryFunction({
      client,
      chain_id,
      market_type,
      market_id,
      offer_side,
      quantity: quantity ?? "0",
    }),
  ]);

  const enriched_market = enrichedMarkets.data?.[0];

  if (!enriched_market) {
    throw new Error("Market not found");
  }

  if (!account) {
    throw new Error("Wallet not connected");
  }

  const schema = getRecipeAPMarketOfferSchema({
    RPC_API_KEYS,
    chain_id,
    account_address: account,
    enriched_market,
  });

  // Add try-catch block around schema validation
  try {
    await schema.parseAsync({ quantity, funding_vault });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.errors[0]?.message ?? "Invalid input");
    }
    throw error;
  }

  const tokenQuotes = await getTokenQuotesQueryFunction({
    client,
    token_ids: [
      enriched_market.input_token_id ?? "",
      ...(marketOffers?.flatMap((offer) => offer.token_ids) ?? []),
    ],
    custom_token_data,
  });

  const { incentiveData, inputTokenData } =
    calculateRecipeAPMarketOfferTokenData({
      baseMarket: baseMarket,
      enrichedMarket: enriched_market,
      marketOffers,
      tokenQuotes,
    });

  // Get pre-contract options
  preContractOptions = await getTokenApprovalContractOptions({
    RPC_API_KEYS,
    chain_id,
    account_address: account,
    spender:
      ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
        .address ?? "",
    funding_vault: funding_vault ?? NULL_ADDRESS,
    market_type: RoycoMarketType.recipe.id,
    token_ids: [enriched_market.input_token_id ?? ""],
    required_approval_amounts: [quantity ?? "0"],
  });

  // Get offer transaction options
  const offerTxOptions: TransactionOptionsType =
    getRecipeAPMarketOfferTransactionOptions({
      chain_id,
      offer_ids: marketOffers?.map((offer) => offer.offer_id) ?? [],
      fill_amounts: marketOffers?.map((offer) => offer.fill_quantity) ?? [],
      funding_vault: funding_vault ?? NULL_ADDRESS,
      frontend_fee_recipient:
        frontend_fee_recipient ?? baseMarket.protocol_fee_recipient,
    });

  // Set offer transaction options
  postContractOptions = [
    {
      ...offerTxOptions,
      tokensIn: incentiveData,
      tokensOut: [inputTokenData],
    },
  ];

  writeContractOptions = [...preContractOptions, ...postContractOptions];

  const fillRequested = parseRawAmount(quantity ?? "0");
  const fillAvailable = parseRawAmount(
    marketOffers?.reduce((acc, offer) => {
      return BigNumber.from(acc)
        .add(BigNumber.from(offer.fill_quantity))
        .toString();
    }, "0") ?? "0",
  );

  if (BigNumber.from(fillAvailable).lte(0)) {
    canBePerformedCompletely = false;
    canBePerformedPartially = false;
  } else if (BigNumber.from(fillAvailable).eq(BigNumber.from(fillRequested))) {
    canBePerformedCompletely = true;
    canBePerformedPartially = true;
  } else {
    canBePerformedCompletely = false;
    canBePerformedPartially = true;
  }

  return {
    incentiveData,
    writeContractOptions,
    canBePerformedCompletely,
    canBePerformedPartially,
  };
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
  const client = useRoycoClient();
  const RPC_API_KEYS = useRpcApiKeys();

  const props = useQuery({
    queryKey: [
      "recipe-ap-market-offer",
      account,
      chain_id,
      market_id,
      quantity,
      funding_vault,
      custom_token_data,
      frontend_fee_recipient,
      enabled,
    ],
    queryFn: () =>
      getRecipeAPMarketOffer({
        client,
        RPC_API_KEYS: RPC_API_KEYS ?? {},
        account,
        chain_id,
        market_id,
        quantity,
        funding_vault,
      }),
    enabled,
  });

  return {
    ...props,
    isValid: {
      status: props.isLoading === false && props.isSuccess === true,
      message: props.error?.message,
    },
    isReady: props.isLoading === false && props.isSuccess === true,
    incentiveData: props.data?.incentiveData ?? [],
    writeContractOptions: props.data?.writeContractOptions ?? [],
    canBePerformedCompletely: props.data?.canBePerformedCompletely ?? false,
    canBePerformedPartially: props.data?.canBePerformedPartially ?? false,
  };
};

import { type Address } from "viem";
import {
  getCompleteMarketQueryFunction,
  getMarketOffersQueryFunction,
  getTokenQuotesQueryFunction,
  getVaultTokenBalanceQueryFunction,
  getWalletTokenBalanceQueryFunction,
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

export const recipeAPLimitOfferSchema = z.object({
  quantity: z
    .string()
    .refine((val) => isSolidityIntValid("uint256", val), "Quantity is invalid")
    .refine(
      (val) => BigNumber.from(val).gt(0),
      "Quantity must be greater than 0",
    )
    .refine(
      (val) => BigNumber.from(val).gt(BigNumber.from("1000000")),
      "Order amount is too low",
    ),
  funding_vault: z
    .string()
    .refine(
      (val) => isSolidityAddressValid("address", val),
      "Funding vault is invalid",
    ),
  token_ids: z
    .array(z.string())
    .refine((val) => val.length > 0, "No incentives added")
    .refine(
      (val) =>
        val.every((id) => isSolidityAddressValid("address", id.split("-")[1])),
      "Incentive address is invalid",
    ),
  token_amounts: z
    .array(z.string())
    .refine((val) => val.length > 0, "No incentives added")
    .refine(
      (val) => val.every((amount) => isSolidityIntValid("uint256", amount)),
      "Incentive amount is invalid",
    )
    .refine(
      (val) => val.every((amount) => BigNumber.from(amount).gt(0)),
      "Incentive amount must be greater than 0",
    ),
  expiry: z
    .string()
    .refine((val) => isSolidityIntValid("uint256", val), "Expiry is invalid")
    .refine(
      (val) =>
        BigNumber.from(val).eq(BigNumber.from("0")) ||
        BigNumber.from(val).gt(BigNumber.from(Math.floor(Date.now() / 1000))),
      "Expiry must be in the future",
    ),
});

export const calculateRecipeAPLimitOfferTokenData = ({
  completeMarket,
  tokenQuotes,
  tokenIds,
  tokenAmounts,
  quantity,
}: {
  completeMarket: Awaited<ReturnType<typeof getCompleteMarketQueryFunction>>;
  tokenQuotes: Awaited<ReturnType<typeof getTokenQuotesQueryFunction>>;
  tokenIds: string[];
  tokenAmounts: string[];
  quantity: string;
}) => {
  let incentiveData: Array<TypedMarketActionIncentiveDataElement> = [];

  // Get the unique token IDs
  const action_incentive_token_ids = tokenIds;

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

  // Calculate incentive data
  incentiveData = action_incentive_token_ids.map(
    (incentive_token_id, index) => {
      // Get incentive token quote
      const incentive_token_quote = extractTokenQuote({
        token_id: incentive_token_id,
        token_quotes: tokenQuotes,
      });

      // Get incentive token raw amount
      const incentive_token_raw_amount: string = tokenAmounts[index] ?? "0";

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
  };
};

export const getRecipeAPLimitOfferTransactionOptions = ({
  market_id,
  chain_id,
  funding_vault,
  quantity,
  token_ids,
  token_amounts,
  expiry,
}: {
  chain_id: number;
  market_id: string;
  funding_vault: string;
  quantity: string;
  token_ids: string[];
  token_amounts: string[];
  expiry: string;
}) => {
  // Get contract address and ABI
  const address =
    ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
      .address;
  const abi =
    ContractMap[chain_id as keyof typeof ContractMap]["RecipeMarketHub"].abi;

  const token_addresses = token_ids.map((id) => id.split("-")[1]);

  // Sort the tokens based on the address in ascending order
  const sortedTokens = token_addresses.map((address, index) => {
    return {
      address,
      amount: token_amounts[index],
    };
  });

  // Sort the tokens based on the address in ascending order
  sortedTokens.sort((a, b) => ((a.address ?? "") > (b.address ?? "") ? 1 : -1));

  // Extract the sorted addresses and amounts
  const sortedTokenAddresses = sortedTokens.map((token) => token.address);
  const sortedTokenAmounts = sortedTokens.map((token) => token.amount);

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "RecipeMarketHub",
    chainId: chain_id,
    id: "create_ap_offer",
    label: "Create AP Offer",
    address: address as Address,
    abi: abi,
    functionName: "createAPOffer",
    marketType: RoycoMarketType.recipe.id,
    args: [
      market_id,
      funding_vault,
      quantity,
      expiry,
      sortedTokenAddresses,
      sortedTokenAmounts,
    ],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

export const isRecipeAPLimitOfferValid = ({
  quantity,
  funding_vault,
  token_ids,
  token_amounts,
  expiry,
  walletTokenBalance,
  vaultTokenBalance,
  completeMarket,
}: {
  quantity: string;
  funding_vault: string;
  token_ids: string[];
  token_amounts: string[];
  expiry: string;
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
    recipeAPLimitOfferSchema.parse({
      quantity,
      funding_vault,
      token_ids,
      token_amounts,
      expiry,
    });

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

export const getRecipeAPLimitOfferCompletionStatus = ({
  quantity,
  walletTokenBalance,
  vaultTokenBalance,
  completeMarket,
  funding_vault,
}: {
  quantity: string;
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

  // Initial status based on fill amounts
  let status = {
    canBePerformedCompletely: true,
    canBePerformedPartially: true,
  };

  // Check if fill amount is zero or negative
  if (BigNumber.from(fillRequested).lte(0)) {
    status.canBePerformedCompletely = false;
    status.canBePerformedPartially = false;
    return status;
  }

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

export const useRecipeAPLimitOffer = ({
  account,
  chain_id,
  market_id,
  quantity,
  token_ids,
  token_amounts,
  expiry,
  funding_vault,
  custom_token_data,
  enabled,
}: {
  account: string | undefined;
  chain_id: number;
  market_id: string;
  quantity: string | undefined;
  token_ids: string[] | undefined;
  token_amounts: string[] | undefined;
  expiry: string | undefined;
  funding_vault: string | undefined;
  custom_token_data?: CustomTokenData;
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

  const propsTokenQuotes = useTokenQuotes({
    token_ids: Array.from(
      new Set([
        propsCompleteMarket.data?.input_token_id ?? "",
        ...(token_ids ?? []),
      ]),
    ),
    custom_token_data,
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const { inputTokenData, incentiveData } =
    calculateRecipeAPLimitOfferTokenData({
      completeMarket: propsCompleteMarket.data ?? null,
      tokenQuotes: propsTokenQuotes.data ?? [],
      tokenIds: token_ids ?? [],
      tokenAmounts: token_amounts ?? [],
      quantity: quantity ?? "0",
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

  const isValid = isRecipeAPLimitOfferValid({
    quantity: quantity ?? "0",
    funding_vault: funding_vault ?? NULL_ADDRESS,
    token_ids: token_ids ?? [],
    token_amounts: token_amounts ?? [],
    expiry: expiry ?? "",
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
    getRecipeAPLimitOfferTransactionOptions({
      chain_id,
      market_id,
      quantity: quantity ?? "0",
      token_ids: token_ids ?? [],
      token_amounts: token_amounts ?? [],
      expiry: expiry ?? "",
      funding_vault: funding_vault ?? NULL_ADDRESS,
    });

  postContractOptions = [
    {
      ...offerTxOptions,
    },
  ];

  writeContractOptions = [...preContractOptions, ...postContractOptions];

  let { canBePerformedCompletely, canBePerformedPartially } =
    getRecipeAPLimitOfferCompletionStatus({
      quantity: quantity ?? "0",
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

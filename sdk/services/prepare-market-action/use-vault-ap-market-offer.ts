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
import { getSupportedToken, NULL_ADDRESS } from "@/sdk/constants";
import { ContractMap } from "@/sdk/contracts";
import {
  useTokenQuotes,
  useMarketOffers,
  extractTokenQuote,
  useCompleteMarket,
  useWalletTokenBalance,
  useVaultTokenBalance,
  useVaultPreviewIncentives,
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

export const vaultAPMarketOfferSchema = z.object({
  quantity: z
    .string()
    .refine((val) => isSolidityIntValid("uint256", val), "Quantity is invalid")
    .refine(
      (val) => BigNumber.from(val).gt(0),
      "Quantity must be greater than 0",
    ),
});

export const getVaultAPMarketOfferTransactionOptions = ({
  chain_id,
  market_id,
  quantity,
  account,
}: {
  chain_id: number;
  market_id: string;
  quantity: string;
  account: string;
}) => {
  // Get contract address and ABI
  const address = market_id;
  const abi =
    ContractMap[chain_id as keyof typeof ContractMap]["WrappedVault"].abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "WrappedVault",
    chainId: chain_id,
    id: "deposit",
    label: "Deposit into Vault",
    address: address,
    abi: abi,
    functionName: "deposit",
    marketType: RoycoMarketType.vault.id,
    args: [quantity, account],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

export const isVaultAPMarketOfferValid = ({
  quantity,
  walletTokenBalance,
  vaultTokenBalance,
  completeMarket,
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
}) => {
  try {
    // Validate schema
    vaultAPMarketOfferSchema.parse({ quantity });

    // Check funding vault balance
    checkFundingVaultBalance({
      quantity,
      funding_vault: NULL_ADDRESS,
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

export const getVaultAPMarketOfferCompletionStatus = ({
  quantity,
  walletTokenBalance,
}: {
  quantity: string;
  walletTokenBalance: Awaited<
    ReturnType<typeof getWalletTokenBalanceQueryFunction>
  > | null;
}) => {
  const fillRequested = parseRawAmount(quantity);

  // Initial status based on fill amounts
  let status = {
    canBePerformedCompletely: true,
    canBePerformedPartially: true,
  };

  // Early return if either amount is zero or negative
  if (BigNumber.from(fillRequested).lte(0)) {
    status.canBePerformedCompletely = false;
    status.canBePerformedPartially = false;
    return status;
  }

  // Check balance constraints
  let hasSufficientBalance = true;

  if (!!walletTokenBalance) {
    // Source of funds is wallet
    if (
      BigNumber.from(walletTokenBalance.raw_amount ?? "0").lt(
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

export const useVaultAPMarketOffer = ({
  account,
  chain_id,
  market_id,
  quantity,
  custom_token_data,
  enabled,
}: {
  account: string | undefined;
  chain_id: number;
  market_id: string;
  quantity: string | undefined;
  custom_token_data?: CustomTokenData;
  frontend_fee_recipient?: string;
  enabled?: boolean;
}) => {
  const RPC_API_KEYS = useRpcApiKeys();

  let preContractOptions: TransactionOptionsType[] = [];
  let postContractOptions: TransactionOptionsType[] = [];
  let writeContractOptions: TransactionOptionsType[] = [];

  const propsCompleteMarket = useCompleteMarket({
    chain_id,
    market_type: RoycoMarketType.vault.value,
    market_id,
  });

  const propsTokenQuotes = useTokenQuotes({
    token_ids: [
      propsCompleteMarket.data?.input_token_id ?? "",
      ...(propsCompleteMarket.data?.incentive_tokens_data.map(
        (incentive) => incentive.id,
      ) ?? []),
    ],
    custom_token_data,
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const propsVaultPreviewIncentives = useVaultPreviewIncentives({
    chain_id,
    vault_address: market_id,
    incentive_ids:
      propsCompleteMarket.data?.incentive_tokens_data.map(
        (incentive) => incentive.id,
      ) ?? [],
    quantity: quantity ?? "0",
    completeMarket: propsCompleteMarket.data ?? null,
    tokenQuotes: propsTokenQuotes.data ?? [],
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const propsWalletTokenBalance = useWalletTokenBalance({
    chain_id,
    account_address: account ?? "",
    token_address:
      propsCompleteMarket.data?.input_token_data.contract_address ?? "",
    enabled: enabled === true && !!propsCompleteMarket.data,
  });

  const isValid = isVaultAPMarketOfferValid({
    quantity: quantity ?? "0",
    walletTokenBalance: propsWalletTokenBalance.data ?? null,
    vaultTokenBalance: null,
    completeMarket: propsCompleteMarket.data ?? null,
  });

  const propsMarketTokenApprovalContractOptions =
    useMarketTokenApprovalContractOptions({
      market_type: RoycoMarketType.vault.id,
      token_ids: [propsCompleteMarket.data?.input_token_id ?? ""],
      required_approval_amounts: [quantity ?? "0"],
      funding_vault: NULL_ADDRESS,
      spender: market_id ?? "",
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      account_address: account ?? "",
    });

  preContractOptions = propsMarketTokenApprovalContractOptions.data ?? [];

  let offerTxOptions: TransactionOptionsType =
    getVaultAPMarketOfferTransactionOptions({
      chain_id,
      market_id,
      quantity: quantity ?? "0",
      account: account ?? "",
    });

  postContractOptions = [
    {
      ...offerTxOptions,
      tokensOut: propsVaultPreviewIncentives.data?.inputTokenData
        ? [propsVaultPreviewIncentives.data.inputTokenData]
        : [],
    },
  ];

  writeContractOptions = [...preContractOptions, ...postContractOptions];

  let { canBePerformedCompletely, canBePerformedPartially } =
    getVaultAPMarketOfferCompletionStatus({
      quantity: quantity ?? "0",
      walletTokenBalance: propsWalletTokenBalance.data ?? null,
    });

  const isLoading =
    propsCompleteMarket.isLoading ||
    propsTokenQuotes.isLoading ||
    propsWalletTokenBalance.isLoading ||
    propsVaultPreviewIncentives.isLoading ||
    propsMarketTokenApprovalContractOptions.isLoading;

  return {
    isLoading,
    isValid,
    canBePerformedCompletely,
    canBePerformedPartially,
    inputTokenData: propsVaultPreviewIncentives.data?.inputTokenData ?? {
      ...getSupportedToken(NULL_ADDRESS),
      raw_amount: "0",
      token_amount: 0,
      token_amount_usd: 0,
      price: 0,
      fdv: 0,
      total_supply: 0,
    },
    incentiveData: propsVaultPreviewIncentives.data?.incentiveData ?? [],
    writeContractOptions,
  };
};

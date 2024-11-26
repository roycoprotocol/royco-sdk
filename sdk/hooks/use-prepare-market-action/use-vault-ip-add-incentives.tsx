import type { Address } from "viem";
import type { EnrichedMarketDataType } from "@/sdk/queries";
import type { TransactionOptionsType } from "@/sdk/types";
import type { ReadMarketDataType } from "@/sdk/hooks";

import { BigNumber } from "ethers";
import { RoycoMarketType } from "@/sdk/market";
import {
  isSolidityAddressValid,
  isSolidityIntValid,
  parseRawAmountToTokenAmount,
} from "@/sdk/utils";
import { useTokenAllowance, getTokenQuote, useTokenQuotes } from "@/sdk/hooks";
import { getSupportedToken, NULL_ADDRESS } from "@/sdk/constants";
import { ContractMap } from "@/sdk/contracts";

import { getApprovalContractOptions, refineTransactionOptions } from "./utils";
import type {
  TypedMarketActionIncentiveDataElement,
  TypedMarketActionInputTokenData,
} from "./types";
import { useDefaultMarketData } from "./use-default-market-data";

export const isVaultIPAddIncentivesValid = ({
  baseMarket,
  enrichedMarket,
  token_ids,
  token_amounts,
  start_timestamps,
  end_timestamps,
  enabled,
}: {
  baseMarket: ReadMarketDataType | undefined;
  enrichedMarket: EnrichedMarketDataType | undefined;
  token_ids: string[] | undefined;
  token_amounts: string[] | undefined;
  start_timestamps: string[] | undefined;
  end_timestamps: string[] | undefined;
  enabled?: boolean;
}) => {
  try {
    // Check if enabled
    if (!enabled) {
      throw new Error("Market action is not enabled");
    }

    // Check market
    if (!enrichedMarket || !baseMarket) {
      throw new Error("Market is missing");
    }

    // Check token IDs
    if (!token_ids) {
      throw new Error("Incentive IDs are missing");
    }

    // Check if at least one token ID is provided
    if (token_ids.length === 0) {
      throw new Error("No incentives added");
    }

    // Check token IDs for validity
    for (let i = 0; i < token_ids.length; i++) {
      const token_address = token_ids[i]?.split("-")[1];

      if (!isSolidityAddressValid("address", token_address)) {
        throw new Error("Incentive address is invalid");
      }
    }

    // Check token amounts
    if (!token_amounts) {
      throw new Error("Incentive amounts are missing");
    }

    // Check token rates for validity
    for (let i = 0; i < token_amounts.length; i++) {
      if (!isSolidityIntValid("uint256", token_amounts[i])) {
        throw new Error("Incentive amount is invalid");
      }

      if (BigNumber.from(token_amounts[i]).lte(0)) {
        throw new Error("Incentive amount must be greater than 0");
      }
    }

    // Check if lengths match
    if (token_ids.length !== token_amounts.length) {
      throw new Error("Incentive ids and amounts do not match");
    }

    /**
     * @note Below code is adapted directly from the smart contract source code
     */
    for (let i = 0; i < token_ids.length; i++) {
      const token_id = token_ids[i];
      const reward = token_id?.split("-")[1];

      const start = BigNumber.from(start_timestamps?.[i] ?? "0");
      const end = BigNumber.from(end_timestamps?.[i] ?? "0");
      const blockTimestamp = BigNumber.from(
        Math.floor(Date.now() / 1000).toString(),
      );
      const totalRewards = BigNumber.from(token_amounts[i]);

      if (start.gte(end) || end.lte(blockTimestamp)) {
        if (start.gte(end)) {
          throw new Error("Start time must be before end time");
        } else if (end.lte(blockTimestamp)) {
          throw new Error("End time must be in the future");
        }
      }

      const MIN_CAMPAIGN_DURATION = 7 * 24 * 60 * 60; // 1 week

      if (end.sub(start).lt(MIN_CAMPAIGN_DURATION)) {
        throw new Error("Campaign duration must be at least 1 week");
      }

      let rewardsInterval = {
        start: BigNumber.from("0"),
        end: BigNumber.from("0"),
        rate: BigNumber.from("0"),
      };

      const existing_reward_index =
        enrichedMarket.base_incentive_ids?.findIndex((id) => id === token_id) ??
        -1;

      if (
        existing_reward_index !== -1 &&
        enrichedMarket.base_start_timestamps &&
        enrichedMarket.base_end_timestamps
      ) {
        rewardsInterval = {
          start: BigNumber.from(
            enrichedMarket.base_start_timestamps[existing_reward_index] ?? "0",
          ),
          end: BigNumber.from(
            enrichedMarket.base_end_timestamps[existing_reward_index] ?? "0",
          ),
          rate: BigNumber.from(
            enrichedMarket.base_incentive_rates?.[existing_reward_index] ?? "0",
          ),
        };
      }

      if (
        blockTimestamp.gte(rewardsInterval.start) &&
        blockTimestamp.lte(rewardsInterval.end)
      ) {
        throw new Error("Interval in progress");
      }

      if (rewardsInterval.start.gt(blockTimestamp)) {
        throw new Error("Interval scheduled in the future");
      }

      const frontendFeeTaken: BigNumber = totalRewards
        .mul(BigNumber.from(baseMarket?.frontend_fee ?? "0"))
        .div(BigNumber.from(10).pow(18));

      const protocolFeeTaken: BigNumber = totalRewards
        .mul(BigNumber.from(baseMarket?.protocol_fee ?? "0"))
        .div(BigNumber.from(10).pow(18));

      const rewardsAfterFee: BigNumber = totalRewards
        .sub(frontendFeeTaken)
        .sub(protocolFeeTaken);

      const rate: BigNumber = rewardsAfterFee.div(end.sub(start));

      if (rate.lte(0)) {
        throw new Error("Incentive rate must be greater than 0");
      }

      // extra check for new incentives
      if (existing_reward_index === -1) {
        const rewards = enrichedMarket.base_incentive_ids ?? [];

        const MAX_REWARDS = 20;

        if (rewards.length === MAX_REWARDS) {
          throw new Error("Vault can only have 20 incentives");
        }

        const rewardsTokenData = getSupportedToken(token_id);
        const rewardsToken = rewardsTokenData.contract_address;

        if (rewardsToken === enrichedMarket.input_token_id) {
          throw new Error(
            "Incentive token cannot be the same as the input token",
          );
        }

        if (rewardsToken === enrichedMarket.market_id) {
          throw new Error("Invalid reward token");
        }
      }
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

export const calculateVaultIPAddIncentivesTokenData = ({
  baseMarket,
  enrichedMarket,
  propsTokenQuotes,
  tokenIds,
  tokenAmounts,
  startTimestamps,
  endTimestamps,
  enabled,
}: {
  baseMarket: ReadMarketDataType | undefined;
  enrichedMarket: EnrichedMarketDataType | undefined;
  propsTokenQuotes: ReturnType<typeof useTokenQuotes>;
  tokenIds: string[];
  tokenAmounts: string[];
  startTimestamps: string[];
  endTimestamps: string[];
  enabled?: boolean;
}) => {
  // Check if enabled
  if (!enabled) {
    return {
      incentiveData: [],
      inputTokenData: undefined,
    };
  }

  let incentiveData: Array<TypedMarketActionIncentiveDataElement> = [];

  // Get the unique token IDs
  const action_incentive_token_ids: string[] = tokenIds;

  // Get action incentive token amounts
  // here, amount is calculated as incentives over the time duration of 1 year
  const action_incentive_token_amounts: string[] = tokenAmounts.map(
    (amount) => {
      return BigNumber.from(amount).toString();
    },
  );

  // Get input token quote
  const input_token_quote = getTokenQuote({
    token_id: enrichedMarket?.input_token_id ?? "",
    token_quotes: propsTokenQuotes,
  });

  // Get input token data
  const input_token_data: TypedMarketActionInputTokenData = {
    ...input_token_quote,
    raw_amount: "0",
    token_amount: 0,
    token_amount_usd: 0,
  };

  if (!!enrichedMarket && !!baseMarket) {
    // Calculate incentive data
    incentiveData = action_incentive_token_ids.map(
      (incentive_token_id, index) => {
        // Get incentive token quote
        const incentive_token_quote = getTokenQuote({
          token_id: incentive_token_id,
          token_quotes: propsTokenQuotes,
        });

        // Get incentive token raw amount
        const incentive_token_raw_amount_with_fees =
          action_incentive_token_amounts[index];

        const protocol_fee = BigNumber.from(
          incentive_token_raw_amount_with_fees,
        )
          .mul(baseMarket.protocol_fee)
          .div(BigNumber.from(10).pow(18));

        const frontend_fee = BigNumber.from(
          incentive_token_raw_amount_with_fees,
        )
          .mul(baseMarket.frontend_fee)
          .div(BigNumber.from(10).pow(18));

        const incentive_token_raw_amount = BigNumber.from(
          incentive_token_raw_amount_with_fees,
        )
          .sub(protocol_fee)
          .sub(frontend_fee)
          .toString();

        // Get incentive token amount
        const incentive_token_amount = parseRawAmountToTokenAmount(
          incentive_token_raw_amount ?? "0",
          incentive_token_quote.decimals,
        );

        // Get incentive token amount in USD
        const incentive_token_amount_usd =
          incentive_token_quote.price * incentive_token_amount;

        // Get per input token
        let per_input_token = 0;

        if (
          enrichedMarket.input_token_data.locked_token_amount &&
          enrichedMarket.input_token_data.locked_token_amount > 0
        ) {
          const new_per_input_token =
            incentive_token_amount /
            (enrichedMarket.input_token_data.locked_token_amount ?? 1);

          if (!isNaN(new_per_input_token)) {
            per_input_token = new_per_input_token;
          }
        }

        // Get annual change ratio
        let annual_change_ratio = 0;

        const start_timestamp: BigNumber = BigNumber.from(
          startTimestamps[index],
        );
        const end_timestamp: BigNumber = BigNumber.from(endTimestamps[index]);

        const scaled_incentive_token_rate = BigNumber.from(
          action_incentive_token_amounts[index],
        )
          .mul(BigNumber.from(10).pow(18))
          .mul(365 * 24 * 60 * 60)
          .div(end_timestamp.sub(start_timestamp).toString());

        const token_rate = parseRawAmountToTokenAmount(
          scaled_incentive_token_rate.toString() ?? "0",
          incentive_token_quote.decimals + 18,
        );

        const rate_in_usd = token_rate * incentive_token_quote.price;

        if (
          enrichedMarket.locked_quantity_usd &&
          enrichedMarket.locked_quantity_usd > 0
        ) {
          const new_annual_change_ratio =
            (rate_in_usd * 365 * 24 * 60 * 60) /
            (enrichedMarket.locked_quantity_usd ?? 1);

          if (!isNaN(new_annual_change_ratio)) {
            annual_change_ratio = new_annual_change_ratio;
          }
        }

        if (annual_change_ratio >= Math.pow(10, 18)) {
          annual_change_ratio = 0;
        }

        // Get incentive token data
        const incentive_token_data = {
          ...incentive_token_quote,
          raw_amount: incentive_token_raw_amount,
          token_amount: incentive_token_amount,
          token_amount_usd: incentive_token_amount_usd,
          per_input_token,
          annual_change_ratio,
          token_rate,
        };

        return incentive_token_data;
      },
    );
  }

  return {
    incentiveData,
    inputTokenData: input_token_data,
  };
};

export const getVaultIPAddIncentivesTransactionOptions = ({
  baseMarket,
  enrichedMarket,
  chain_id,
  market_id,
  token_ids,
  token_amounts,
  start_timestamps,
  end_timestamps,
  frontend_fee_recipient,
}: {
  baseMarket: ReadMarketDataType | undefined;
  enrichedMarket: EnrichedMarketDataType | undefined;
  chain_id: number;
  market_id: string;
  token_ids: string[];
  token_amounts: string[];
  start_timestamps: string[];
  end_timestamps: string[];
  frontend_fee_recipient?: string;
}) => {
  // Get contract address and ABI
  const address = enrichedMarket?.market_id ?? "";
  const abi =
    ContractMap[chain_id as keyof typeof ContractMap]["WrappedVault"].abi;

  // Get add reward transaction options
  let addRewardTxOptions: TransactionOptionsType[] = [];

  // Loop through the token IDs
  for (let i = 0; i < token_ids.length; i++) {
    const token_id = token_ids[i];
    const token_address = token_id?.split("-")[1];
    const token_amount = token_amounts[i];
    const token_data = getSupportedToken(token_id);

    const existing_token_ids = enrichedMarket?.base_incentive_ids ?? [];

    if (existing_token_ids.includes(token_id ?? "")) {
      continue;
    } else {
      const newTxOptions: TransactionOptionsType = {
        contractId: "WrappedVault",
        chainId: chain_id,
        id: `add_reward_${token_address}`,
        label: `Add Reward ${token_data?.symbol.toUpperCase()}`,
        address,
        abi,
        functionName: "addRewardsToken",
        marketType: RoycoMarketType.vault.id,
        args: [token_address],
        txStatus: "idle",
        txHash: null,
      };

      addRewardTxOptions.push(newTxOptions);
    }
  }

  // Get set reward transaction options
  let setRewardTxOptions: TransactionOptionsType[] = [];

  // Set New Rewards
  for (let i = 0; i < token_ids.length; i++) {
    const token_id = token_ids[i];
    const token_address = token_id?.split("-")[1];
    const token_data = getSupportedToken(token_id);

    // const existing_token_ids = enrichedMarket?.base_incentive_ids ?? [];

    // if (existing_token_ids.includes(token_id)) {
    //   continue;
    // }

    const newTxOptions: TransactionOptionsType = {
      contractId: "WrappedVault",
      chainId: chain_id,
      id: `set_reward_${token_address}`,
      label: `Set Reward ${token_data?.symbol.toUpperCase()}`,
      address,
      abi,
      functionName: "setRewardsInterval",
      marketType: RoycoMarketType.vault.id,
      args: [
        token_address,
        start_timestamps[i],
        end_timestamps[i],
        token_amounts[i],
        frontend_fee_recipient
          ? frontend_fee_recipient
          : baseMarket?.protocol_fee_recipient,
      ],
      txStatus: "idle",
      txHash: null,
      tokensOut: [
        {
          ...token_data,
          raw_amount: token_amounts[i] ?? "0",
          token_amount: parseRawAmountToTokenAmount(
            token_amounts[i] ?? "0",
            token_data.decimals,
          ),
        },
      ],
    };

    setRewardTxOptions.push(newTxOptions);
  }

  // Combine all transaction options
  const txOptions = [...addRewardTxOptions, ...setRewardTxOptions];

  return txOptions;
};

export const useVaultIPAddIncentives = ({
  account,
  chain_id,
  market_id,
  token_ids,
  token_amounts,
  start_timestamps,
  end_timestamps,
  custom_token_data,
  frontend_fee_recipient,
  enabled,
}: {
  account: string | undefined;
  chain_id: number;
  market_id: string;
  token_ids: string[] | undefined;
  token_amounts: string[] | undefined;
  start_timestamps: string[] | undefined;
  end_timestamps: string[] | undefined;
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
  const isValid = isVaultIPAddIncentivesValid({
    baseMarket,
    enrichedMarket,
    token_ids,
    token_amounts,
    start_timestamps,
    end_timestamps,
    enabled: enabled && !!baseMarket && !!enrichedMarket,
  });

  // Get token quotes
  const propsTokenQuotes = useTokenQuotes({
    token_ids: Array.from(
      new Set([enrichedMarket?.input_token_id ?? "", ...(token_ids ?? [])]),
    ),
    custom_token_data,
    enabled: isValid.status,
  });

  // Get incentive data
  const { incentiveData, inputTokenData } =
    calculateVaultIPAddIncentivesTokenData({
      baseMarket,
      enrichedMarket,
      propsTokenQuotes,
      tokenIds: token_ids ?? [],
      tokenAmounts: token_amounts ?? [],
      startTimestamps: start_timestamps ?? [],
      endTimestamps: end_timestamps ?? [],
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
    const offerTxOptions: TransactionOptionsType[] =
      getVaultIPAddIncentivesTransactionOptions({
        baseMarket,
        enrichedMarket,
        chain_id,
        market_id,
        token_ids: token_ids ?? [],
        token_amounts: token_amounts ?? [],
        start_timestamps: start_timestamps ?? [],
        end_timestamps: end_timestamps ?? [],
        frontend_fee_recipient:
          frontend_fee_recipient ?? baseMarket?.protocol_fee_recipient,
      });

    // Set offer transaction options
    postContractOptions = offerTxOptions;

    // Get approval transaction options
    const approvalTxOptions: TransactionOptionsType[] =
      getApprovalContractOptions({
        market_type: RoycoMarketType.vault.id,
        token_ids: token_ids ?? [],
        required_approval_amounts: token_amounts ?? [],
        spender: market_id,
      });

    // Set approval transaction options
    preContractOptions = approvalTxOptions;
  }

  // console.log("preContractOptions", preContractOptions);
  // console.log("postContractOptions", postContractOptions);

  // Get token allowance
  const propsTokenAllowance = useTokenAllowance({
    chain_id: chain_id,
    account: account ? (account as Address) : NULL_ADDRESS,
    spender: market_id as Address,
    tokens: preContractOptions.map((option) => {
      return option.address as Address;
    }),
  });

  if (!propsTokenAllowance.isLoading) {
    // Refine transaction options
    writeContractOptions = refineTransactionOptions({
      propsTokenAllowance,
      preContractOptions,
      postContractOptions,
    });
  }

  // Check if loading
  const isLoading =
    isLoadingDefaultMarketData ||
    propsTokenAllowance.isLoading ||
    propsTokenQuotes.isLoading;

  // Check if ready
  const isReady = writeContractOptions.length > 0;

  // Check if offer can be performed completely or partially
  if (isReady) {
    canBePerformedCompletely = true;
    canBePerformedPartially = true;
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

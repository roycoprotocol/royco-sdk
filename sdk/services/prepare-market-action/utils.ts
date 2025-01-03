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

import { z } from "zod";
import { TypedRpcApiKeys, useRoycoClient } from "@/sdk/client";
import { RoycoClient, TypedRoycoClient } from "@/sdk/client";

import type {
  TypedMarketActionIncentiveDataElement,
  TypedMarketActionInputTokenData,
} from "./types";

export const hasWalletBalance = async ({
  target_address,
  account_address,
  required_balance,
  RPC_API_KEYS,
  chain_id,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
  target_address: string;
  required_balance: string;
}) => {
  try {
    const chainClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: getSupportedChain(chain_id),
      transport: http(RPC_API_KEYS[chain_id]),
    });

    const contracts = [
      {
        address: target_address as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account_address as Address],
      },
    ];

    const query = await chainClient.multicall({ contracts });

    const current_balance = query[0]?.result?.toString() ?? "0";

    return BigNumber.from(current_balance).gte(
      BigNumber.from(required_balance),
    );
  } catch (err) {
    return false;
  }
};

export const hasVaultBalance = async ({
  target_address,
  account_address,
  required_balance,
  required_asset,
  RPC_API_KEYS,
  chain_id,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
  target_address: string;
  required_balance: string;
  required_asset: string;
}) => {
  try {
    const chainClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: getSupportedChain(chain_id),
      transport: http(RPC_API_KEYS[chain_id]),
    });

    const contracts = [
      {
        address: target_address as Address,
        abi: erc4626Abi,
        functionName: "asset",
        args: [],
      },
      {
        address: target_address as Address,
        abi: erc4626Abi,
        functionName: "maxWithdraw",
        args: [account_address as Address],
      },
    ];

    const query = await chainClient.multicall({ contracts });

    const current_asset = query[0]?.result?.toString() ?? NULL_ADDRESS;
    const current_balance = query[1]?.result?.toString() ?? "0";

    if (current_asset.toLowerCase() !== required_asset.toLowerCase()) {
      return false;
    }

    return BigNumber.from(current_balance).gte(
      BigNumber.from(required_balance),
    );
  } catch (err) {
    return false;
  }
};

export const getTokenApprovalContractOptions = async ({
  market_type,
  token_ids,
  required_approval_amounts,
  funding_vault,
  spender,
  RPC_API_KEYS,
  chain_id,
  account_address,
}: {
  market_type: TypedRoycoMarketType;
  token_ids: string[];
  required_approval_amounts: string[];
  funding_vault: string;
  spender: string;
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
}) => {
  const txOptions: TransactionOptionsType[] = [];

  if (funding_vault === NULL_ADDRESS) {
    // Approve tokens from wallet
    token_ids.forEach((token_id, token_index) => {
      const token = getSupportedToken(token_id);

      const newTxOptions: TransactionOptionsType = {
        contractId: "Erc20",
        chainId: token.chain_id,
        id: `approve_token_${token.id}`,
        label: `Approve ${token.symbol.toUpperCase()}`,
        address: token.contract_address,
        abi: erc20Abi,
        functionName: "approve",
        marketType: market_type,
        args: [spender, ethers.constants.MaxUint256.toString()],
        txStatus: token.type === "point" ? "success" : "idle",
        txHash: null,
        requiredApprovalAmount: required_approval_amounts[token_index],
      };

      txOptions.push(newTxOptions);
    });

    const chainClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: getSupportedChain(chain_id),
      transport: http(RPC_API_KEYS[chain_id]),
    });

    const contracts = txOptions
      .filter((txOption) => txOption.txStatus === "idle")
      .map((txOption) => {
        return {
          address: txOption.address as Address,
          abi: erc20Abi,
          functionName: "allowance",
          args: [account_address as Address, spender as Address],
        };
      });

    const query = await chainClient.multicall({ contracts });

    query.forEach((result, index) => {
      const allowance = result?.result?.toString() ?? "0";
      const required_approval_amount = required_approval_amounts[index];
      const has_sufficient_allowance = BigNumber.from(allowance).gte(
        BigNumber.from(required_approval_amount),
      );

      if (has_sufficient_allowance) {
        txOptions[index]!.txStatus = "success";
      }
    });
  } else {
    // Approve tokens from vault
    token_ids.forEach((token_id, token_index) => {
      const token = getSupportedToken(token_id);

      const newTxOptions: TransactionOptionsType = {
        contractId: "Erc4626",
        chainId: token.chain_id,
        id: `approve_vault_${token.id}`,
        label: `Approve ${token.symbol.toUpperCase()}`,
        address: funding_vault,
        abi: erc4626Abi,
        functionName: "approve",
        marketType: market_type,
        args: [spender, ethers.constants.MaxUint256.toString()],
        txStatus: "idle",
        txHash: null,
        requiredApprovalAmount: required_approval_amounts[token_index],
      };

      txOptions.push(newTxOptions);
    });

    const chainClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: getSupportedChain(chain_id),
      transport: http(RPC_API_KEYS[chain_id]),
    });

    const contracts = txOptions
      .filter((txOption) => txOption.txStatus === "idle")
      .map((txOption) => {
        return {
          address: txOption.address as Address,
          abi: erc4626Abi,
          functionName: "allowance",
          args: [account_address as Address, spender as Address],
        };
      });

    const query = await chainClient.multicall({ contracts });

    query.forEach((result, index) => {
      const allowance = result?.result?.toString() ?? "0";
      const required_approval_amount = required_approval_amounts[index];
      const has_sufficient_allowance = BigNumber.from(allowance).gte(
        BigNumber.from(required_approval_amount),
      );

      if (has_sufficient_allowance) {
        txOptions[index]!.txStatus = "success";
      }
    });
  }

  return txOptions;
};

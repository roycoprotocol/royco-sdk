import { AddressMap, AbiMap } from "@/sdk/constants";
import { type Address, type Abi } from "viem";
import { type EnrichedTxOption } from "@/sdk/transaction/types";

export const withdrawRecipeInputTokenTxOptions = ({
  chainId,
  weirollWallet,
}: {
  chainId: number;
  weirollWallet: string;
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  return [
    {
      id: `${chainId}_${weirollWallet}_input_token`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Withdraw Deposit",
      category: "withdraw",
      address: address as Address,
      abi: abi as Abi,
      functionName: "executeWithdrawalScript",
      args: [weirollWallet],
      txStatus: "idle",
    },
  ];
};

export const claimRecipeIncentiveTokenTxOptions = ({
  chainId,
  tokenAddress,
  weirollWallet,
  accountAddress,
}: {
  chainId: number;
  tokenAddress: string;
  weirollWallet: string;
  accountAddress: string;
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  return [
    {
      id: `${chainId}_${weirollWallet}_${tokenAddress}_incentive_token`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Claim Incentive",
      category: "claim",
      address: address as Address,
      abi: abi as Abi,
      functionName: "claim",
      args: [weirollWallet, tokenAddress, accountAddress],
      txStatus: "idle",
    },
  ];
};

export const forfeitRecipePositionTxOptions = ({
  chainId,
  weirollWallet,
}: {
  chainId: number;
  weirollWallet: string;
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  return [
    {
      id: `${chainId}_${weirollWallet}_forfeit`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Forfeit Position",
      category: "forfeit",
      address: address as Address,
      abi: abi as Abi,
      functionName: "forfeit",
      args: [weirollWallet, true],
      txStatus: "idle",
    },
  ];
};

export const withdrawBoycoReceiptTokenTxOptions = ({
  weirollWallet,
  merkleDepositNonce,
  amountDeposited,
  merkleProof,
}: {
  weirollWallet: string;
  merkleDepositNonce: string;
  amountDeposited: string;
  merkleProof: string[];
}): EnrichedTxOption[] => {
  const chainId = 80094;

  const address = AddressMap.get(`${chainId}_DepositExecutor`);
  const abi = AbiMap.get("DepositExecutor");

  return [
    {
      id: `${chainId}_${weirollWallet}_withdraw_receipt_token`,
      chainId,
      contractId: "DepositExecutor",
      label: "Withdraw Receipt Tokens",
      category: "withdraw",
      address: address as Address,
      abi: abi as Abi,
      functionName: "withdrawMerkleDeposit",
      args: [weirollWallet, merkleDepositNonce, amountDeposited, merkleProof],
      txStatus: "idle",
    },
  ];
};

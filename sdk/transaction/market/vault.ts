import { AddressMap, AbiMap } from "@/sdk/constants";
import { type Address, type Abi } from "viem";
import { type EnrichedTxOption } from "@/sdk/transaction/types";

export const withdrawVaultInputTokenBySharesTxOptions = ({
  chainId,
  vaultAddress,
  shares,
  accountAddress,
}: {
  chainId: number;
  vaultAddress: string;
  shares: string;
  accountAddress: string;
}): EnrichedTxOption[] => {
  const address = vaultAddress;
  const abi = AbiMap.get("WrappedVault");

  return [
    {
      id: `${chainId}_${accountAddress}_input_token_shares`,
      chainId,
      contractId: "WrappedVault",
      label: "Withdraw Deposit",
      category: "withdraw",
      address: address as Address,
      abi: abi as Abi,
      functionName: "redeem",
      args: [shares, accountAddress, accountAddress],
      txStatus: "idle",
    },
  ];
};

export const withdrawVaultInputTokenByAssetTxOptions = ({
  chainId,
  vaultAddress,
  rawAmount,
  accountAddress,
}: {
  chainId: number;
  vaultAddress: string;
  rawAmount: string;
  accountAddress: string;
}): EnrichedTxOption[] => {
  const address = vaultAddress;
  const abi = AbiMap.get("WrappedVault");

  return [
    {
      id: `${chainId}_${accountAddress}_input_token_assets`,
      chainId,
      contractId: "WrappedVault",
      category: "withdraw",
      label: "Withdraw Deposit",
      address: address as Address,
      abi: abi as Abi,
      functionName: "withdraw",
      args: [rawAmount, accountAddress, accountAddress],
      txStatus: "idle",
    },
  ];
};

export const claimVaultIncentiveTokenTxOptions = ({
  chainId,
  vaultAddress,
  tokenAddress,
  accountAddress,
}: {
  chainId: number;
  vaultAddress: string;
  tokenAddress: string;
  accountAddress: string;
}): EnrichedTxOption[] => {
  const address = vaultAddress;
  const abi = AbiMap.get("WrappedVault");

  return [
    {
      id: `${chainId}_${accountAddress}_incentive_token`,
      chainId,
      contractId: "WrappedVault",
      category: "claim",
      label: "Claim Incentive",
      address: address as Address,
      abi: abi as Abi,
      functionName: "claim",
      args: [accountAddress, tokenAddress],
      txStatus: "idle",
    },
  ];
};

export const cancelVaultAPOfferTxOptions = ({
  chainId,
  offerId,
  marketId,
  accountAddress,
  fundingVault,

  expiry,
  incentiveTokenAddresses,
  incentivesRateRawAmounts,
}: {
  chainId: number;
  offerId: string;
  marketId: string;
  accountAddress: string;
  fundingVault: string;
  expiry: string;
  incentiveTokenAddresses: string[];
  incentivesRateRawAmounts: string[];
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_VaultMarketHub`);
  const abi = AbiMap.get("VaultMarketHub");

  return [
    {
      id: `${chainId}_${offerId}_cancel_ap_offer`,
      chainId,
      contractId: "VaultMarketHub",
      category: "cancel",
      label: "Cancel Limit Offer",
      address: address as Address,
      abi: abi as Abi,
      functionName: "cancelOffer",
      args: [
        {
          offerID: offerId,
          targetVault: marketId,
          ap: accountAddress,
          fundingVault,
          expiry,
          incentivesRequested: incentiveTokenAddresses,
          incentivesRatesRequested: incentivesRateRawAmounts,
        },
      ],
      txStatus: "idle",
    },
  ];
};

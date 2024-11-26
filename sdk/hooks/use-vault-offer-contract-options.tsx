import type { TransactionOptionsType } from "@/sdk/types";
import type { EnrichedOfferDataType } from "@/sdk/queries";

import { ContractMap } from "@/sdk/contracts";
import { RoycoMarketType } from "@/sdk/market";
import type { Address } from "viem";

export const getVaultCancelAPOfferTransactionOptions = ({
  offer,
}: {
  offer: EnrichedOfferDataType;
}) => {
  // Get contract address and ABI
  const address =
    ContractMap[offer.chain_id as keyof typeof ContractMap]["VaultMarketHub"]
      .address;
  const abi =
    ContractMap[offer.chain_id as keyof typeof ContractMap]["VaultMarketHub"]
      .abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "VaultMarketHub",
    chainId: offer.chain_id ?? 0,
    id: "cancel_ap_offer",
    label: "Cancel AP Offer",
    address: address as Address,
    abi,
    functionName: "cancelOffer",
    marketType: RoycoMarketType.vault.id,
    args: [
      {
        offerID: offer.offer_id,
        targetVault: offer.market_id,
        ap: offer.creator,
        fundingVault: offer.funding_vault,
        expiry: offer.expiry,
        incentivesRequested: (offer.token_ids ?? []).map((tokenId) => {
          const [chainId, contractAddress] = tokenId.split("-");
          return contractAddress;
        }),
        incentivesRatesRequested: offer.token_amounts,
      },
    ],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

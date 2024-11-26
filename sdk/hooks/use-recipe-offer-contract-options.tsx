import { ContractMap } from "@/sdk/contracts";
import { RoycoMarketType } from "@/sdk/market";
import type { EnrichedOfferDataType } from "@/sdk/queries";
import type { TransactionOptionsType } from "@/sdk/types";
import type { Address } from "viem";

export const getRecipeCancelAPOfferTransactionOptions = ({
  offer,
}: {
  offer: EnrichedOfferDataType;
}) => {
  // Get contract address and ABI
  const address =
    ContractMap[offer.chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
      .address;
  const abi =
    ContractMap[offer.chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
      .abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "RecipeMarketHub",
    chainId: offer.chain_id ?? 0,
    id: "cancel_ap_offer",
    label: "Cancel AP Offer",
    address: address as Address,
    abi,
    functionName: "cancelAPOffer",
    marketType: RoycoMarketType.recipe.id,
    args: [
      {
        offerID: offer.offer_id,
        targetMarketHash: offer.market_id,
        ap: offer.creator,
        fundingVault: offer.funding_vault,
        quantity: offer.quantity,
        expiry: offer.expiry,
        incentivesRequested: (offer.token_ids ?? []).map((tokenId) => {
          const [chainId, contractAddress] = tokenId.split("-");
          return contractAddress;
        }),
        incentiveAmountsRequested: offer.token_amounts,
      },
    ],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

export const getRecipeCancelIPOfferTransactionOptions = ({
  offer,
}: {
  offer: EnrichedOfferDataType;
}) => {
  // Get contract address and ABI
  const address =
    ContractMap[offer.chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
      .address;
  const abi =
    ContractMap[offer.chain_id as keyof typeof ContractMap]["RecipeMarketHub"]
      .abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "RecipeMarketHub",
    chainId: offer.chain_id ?? 0,
    id: "cancel_ip_offer",
    label: "Cancel IP Offer",
    address: address as Address,
    abi,
    functionName: "cancelIPOffer",
    marketType: RoycoMarketType.recipe.id,
    args: [offer.offer_id],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

import { AbiMap, AddressMap } from "@/sdk/constants";
import { type Abi, type Address } from "viem";
import { type EnrichedTxOption } from "@/sdk/transaction/types";

export const cancelRecipeAPOfferTxOptions = ({
  chainId,
  offerId,
  marketId,
  accountAddress,
  fundingVault,
  quantity,
  expiry,
  incentiveTokenIds,
  incentiveTokenAmounts,
}: {
  chainId: number;
  offerId: string;
  marketId: string;
  accountAddress: string;
  fundingVault: string;
  quantity: string;
  expiry: string;
  incentiveTokenIds: string[];
  incentiveTokenAmounts: string[];
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  return [
    {
      id: `${chainId}_${offerId}_cancel_ap_offer`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Cancel Offer",
      category: "cancel",
      address: address as Address,
      abi: abi as Abi,
      functionName: "cancelAPOffer",
      args: [
        {
          offerID: offerId,
          targetMarketHash: marketId,
          ap: accountAddress,
          fundingVault,
          quantity,
          expiry,
          incentivesRequested: incentiveTokenIds.map((tokenId) => {
            return tokenId.split("-")[1];
          }),
          incentiveAmountsRequested: incentiveTokenAmounts,
        },
      ],
      txStatus: "idle",
    },
  ];
};

export const cancelRecipeIPOfferTxOptions = ({
  chainId,
  offerId,
}: {
  chainId: number;
  offerId: string;
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_RecipeMarketHub`);
  const abi = AbiMap.get("RecipeMarketHub");

  return [
    {
      id: `${chainId}_${offerId}_cancel_ip_offer`,
      chainId,
      contractId: "RecipeMarketHub",
      label: "Cancel Offer",
      category: "cancel",
      address: address as Address,
      abi: abi as Abi,
      functionName: "cancelIPOffer",
      args: [offerId],
      txStatus: "idle",
    },
  ];
};

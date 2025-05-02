import { AbiMap, AddressMap } from "@/sdk/constants";
import { type Abi, type Address } from "viem";
import { type EnrichedTxOption } from "@/sdk/transaction/types";

export const cancelVaultAPOfferTxOptions = ({
  chainId,
  offerId,
  marketId,
  accountAddress,
  fundingVault,
  expiry,
  incentiveTokenIds,
  incentiveTokenAmounts,
}: {
  chainId: number;
  offerId: string;
  marketId: string;
  accountAddress: string;
  fundingVault: string;
  expiry: string;
  incentiveTokenIds: string[];
  incentiveTokenAmounts: string[];
}): EnrichedTxOption[] => {
  const address = AddressMap.get(`${chainId}_VaultMarketHub`);
  const abi = AbiMap.get("VaultMarketHub");

  return [
    {
      id: `${chainId}_${offerId}_cancel_ap_offer`,
      chainId,
      contractId: "VaultMarketHub",
      label: "Cancel Offer",
      category: "cancel",
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

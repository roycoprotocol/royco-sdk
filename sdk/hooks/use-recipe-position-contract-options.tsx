import { ContractMap } from "@/sdk/contracts";
import { RoycoMarketType } from "@/sdk/market";
import type { EnrichedPositionsRecipeDataType } from "@/sdk/queries";
import type { TransactionOptionsType } from "@/sdk/types";
import type { Address } from "viem";

export const getRecipeForfeitTransactionOptions = ({
  position,
}: {
  position: EnrichedPositionsRecipeDataType;
})  => {
  // Get contract address and ABI
  const address =
    ContractMap[position.chain_id as keyof typeof ContractMap][
      "RecipeMarketHub"
    ].address;
  const abi =
    ContractMap[position.chain_id as keyof typeof ContractMap][
      "RecipeMarketHub"
    ].abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "RecipeMarketHub",
    chainId: position.chain_id ?? 0,
    id: "forfeit",
    label: "Forfeit Position",
    address: address as Address,
    abi,
    functionName: "forfeit",
    marketType: RoycoMarketType.recipe.id,
    args: [position.weiroll_wallet, false], // @note: by default, we are not executing the withdrawal script upon forfeiting
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

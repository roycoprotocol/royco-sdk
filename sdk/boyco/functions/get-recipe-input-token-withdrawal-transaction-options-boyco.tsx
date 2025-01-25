import {
  BerachainMainnet,
  BerachainTestnet,
  type SupportedToken,
} from "@/sdk/constants";
import type { TransactionOptionsType } from "@/sdk/types";

import { ContractMap } from "@/sdk/contracts";
import { RoycoMarketType } from "@/sdk/market";
import type { Address } from "viem";
import { ContractMapBoyco } from "../contract-map";

export const getRecipeInputTokenWithdrawalTransactionOptionsBoyco = ({
  chain_id,
  position,
}: {
  chain_id: number;
  position:
    | {
        weiroll_wallet: string;
        merkle_deposit_nonce: number;
        amount_deposited: string;
        merkle_proof: string[];
      }
    | undefined
    | null;
}) => {
  // Get contract address and ABI
  const address =
    ContractMapBoyco[chain_id as keyof typeof ContractMapBoyco][
      "DepositExecutor"
    ].address;
  const abi =
    ContractMapBoyco[chain_id as keyof typeof ContractMapBoyco][
      "DepositExecutor"
    ].abi;

  // Get transaction options
  const txOptions: TransactionOptionsType = {
    contractId: "DepositExecutor",
    chainId: chain_id,
    id: "withdraw_input_token_on_berachain",
    label: "Withdraw ",
    address: address as Address,
    abi,
    functionName: "withdrawMerkleDeposit",
    marketType: RoycoMarketType.recipe.id,
    args: [
      position?.weiroll_wallet,
      position?.merkle_deposit_nonce,
      position?.amount_deposited,
      position?.merkle_proof,
    ],
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

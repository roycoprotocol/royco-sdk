import { Address } from "abitype";
import { Contracts_80094 } from "../contracts/80094";
import type { EnrichedPositionsBoycoDataType } from "../queries/get-enriched-positions-boyco";
import { TransactionOptionsType } from "../types";

export const getBoycoReceiptTokenWithdrawalTransactionOptions = ({
  position,
}: {
  position: EnrichedPositionsBoycoDataType;
}) => {
  const address = Contracts_80094.DepositExecutor.address;
  const abi = Contracts_80094.DepositExecutor.abi;

  const txOptions: TransactionOptionsType = {
    contractId: "DepositExecutor",
    chainId: 80094,
    id: "withdraw_receipt_token",
    label: "Withdraw Receipt Token",
    address: address as Address,
    abi,
    functionName: "withdrawMerkleDeposit",
    args: [
      position.weiroll_wallet,
      position.merkle_deposit_nonce,
      position.amount_deposited,
      position.merkle_proof,
    ],
    marketType: "recipe",
    txStatus: "idle",
    txHash: null,
  };

  return txOptions;
};

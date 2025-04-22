import { type EnrichedTxOption } from "@/sdk/transaction/types";
import { RawTxOption } from "@/sdk/api";
import { AbiMap } from "../constants";
import { type Abi } from "viem";

export const enrichTxOptions = ({
  txOptions,
}: {
  txOptions: RawTxOption[];
}): EnrichedTxOption[] => {
  return txOptions.map((txOption) => {
    const abi = AbiMap.get(txOption.contractId);

    return {
      ...txOption,
      abi: abi as Abi,
    };
  });
};

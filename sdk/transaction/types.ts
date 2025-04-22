import { Abi } from "viem";
import { RawTxOption } from "../api";

export type EnrichedTxOption = RawTxOption & {
  abi: Abi;
};

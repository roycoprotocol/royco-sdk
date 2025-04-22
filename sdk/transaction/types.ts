import { Abi, Address } from "viem";
import { RawTxOption } from "../api";

export type EnrichedTxOption = RawTxOption & {
  abi: Abi;
  address: Address;
};

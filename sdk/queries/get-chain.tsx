import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type ChainInfo = Pick<
  Tables<"chains">,
  "id" | "chain_id" | "image" | "name" | "symbol"
>;

export const getChainInfoQueryOptions = (
  client: TypedRoycoClient,
  chain_id: number,
) => ({
  queryKey: ["chain", `chain_id=${chain_id}`],
  queryFn: async () => {
    return client
      .from("chains")
      .select("id, chain_id, image, name, symbol")
      .eq("chain_id", chain_id)
      .single()
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
});

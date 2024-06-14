import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type DistinctChains = Pick<
  Tables<"distinct_chains">,
  "id" | "symbol" | "image"
>;

export const getDistinctChainsQueryOptions = (client: TypedRoycoClient) => ({
  queryKey: ["distinct-chains"],
  queryFn: async () => {
    return client
      .from("distinct_chains")
      .select("id, image, symbol")
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60, // 60 minutes
});

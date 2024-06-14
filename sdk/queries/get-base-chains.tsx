import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type BaseChain = Pick<Tables<"base_chains">, "id" | "image" | "symbol">;

export const getBaseChainsQueryOptions = (client: TypedRoycoClient) => ({
  queryKey: ["base_chains"],
  queryFn: async () => {
    return client
      .from("base_chains")
      .select("id, image, symbol")
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
  refetchOnWindowFocus: false,
  refreshInBackground: true,
});

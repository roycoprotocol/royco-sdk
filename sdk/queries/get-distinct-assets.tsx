import type { TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";
import type { UseQueryOptions } from "@tanstack/react-query";

export type DistinctAssets = Pick<Tables<"distinct_assets">, "symbol" | "ids">;

export const getDistinctAssetsQueryOptions = (
  client: TypedRoycoClient,
)  => ({
  queryKey: ["distinct-assets"],
  queryFn: async () => {
    return client
      .from("distinct_assets")
      .select("symbol, ids")
      .throwOnError()
      .then((result) => result.data);
  },
  refetchInterval: 1000 * 60 * 1, // 1 minute
});

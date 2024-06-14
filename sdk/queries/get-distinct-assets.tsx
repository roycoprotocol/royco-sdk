import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type DistinctAssets = Pick<
  Tables<"distinct_assets">,
  "symbol" | "image" | "ids"
>;

export const getDistinctAssetsQueryOptions = (client: TypedRoycoClient) => ({
  queryKey: ["distinct-assets"],
  queryFn: async () => {
    return client
      .from("distinct_assets")
      .select("symbol, ids, image")
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  staleTime: 1000 * 60 * 60, // 60 minutes
});

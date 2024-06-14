import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type PoolStats = Pick<Tables<"pools">, "id" | "rewards" | "apy" | "tvl">;

export const getPoolStatsQueryOptions = (
  client: TypedRoycoClient,
  id: string
) => ({
  queryKey: ["pool-stats", `id=${id}`],
  queryFn: async () => {
    return client
      .from("pools")
      .select("id, rewards, apy, tvl")
      .eq("id", id)
      .single()
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  placeholderData: (previousData) => previousData,
});

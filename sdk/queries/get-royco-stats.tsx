import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";
import { getRandomMultiplier } from "@/sdk/utils";

export type RoycoStats = Pick<
  Tables<"royco_stats">,
  "tvl" | "volume" | "rewards"
>;

export const getRoycoStatsQueryOptions = (client: TypedRoycoClient) => ({
  queryKey: ["royco-stats"],
  queryFn: async () => {
    return client
      .from("royco_stats")
      .select("tvl, volume, rewards")
      .single()
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  refetchInterval: 1000 * 60 * 1, // 1 minute
  // refetchInterval: 1000 * 10, // 10 seconds
});

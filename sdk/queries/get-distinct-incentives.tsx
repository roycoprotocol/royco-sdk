import type { TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";
import type { UseQueryOptions } from "@tanstack/react-query";

export type DistinctIncentives = Pick<
  Tables<"distinct_incentives">,
  "symbol" | "ids"
>;

export const getDistinctIncentivesQueryOptions = (
  client: TypedRoycoClient,
)  => ({
  queryKey: ["distinct-incentives"],
  queryFn: async () => {
    return client
      .from("distinct_incentives")
      .select("symbol, ids")
      .throwOnError()
      .then((result) => result.data);
  },
  refetchInterval: 1000 * 60 * 1, // 1 minute
});

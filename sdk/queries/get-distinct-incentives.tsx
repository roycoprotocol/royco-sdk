import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type DistinctIncentives = Pick<
  Tables<"distinct_incentives">,
  "symbol" | "image" | "ids"
>;

export const getDistinctIncentivesQueryOptions = (
  client: TypedRoycoClient
) => ({
  queryKey: ["distinct-incentives"],
  queryFn: async () => {
    return client
      .from("distinct_incentives")
      .select("symbol, ids, image")
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
});

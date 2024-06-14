import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type BaseActions = Pick<Tables<"base_actions">, "id" | "name">;

export const getBaseActionsQueryOptions = (client: TypedRoycoClient) => ({
  queryKey: ["base_actions"],
  queryFn: async () => {
    return client
      .from("base_actions")
      .select("id, name")
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
  refetchOnWindowFocus: false,
  refreshInBackground: true,
});

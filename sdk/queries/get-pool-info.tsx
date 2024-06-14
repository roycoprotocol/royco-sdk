import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type PoolInfo = Pick<
  Tables<"pools">,
  | "id"
  | "chain_id"
  | "name"
  | "assets"
  | "affiliate_fee"
  | "description"
  | "action"
  | "timelock"
  | "incentive"
  | "incentives"
>;

export const getPoolInfoQueryOptions = (
  client: TypedRoycoClient,
  id: string
) => ({
  queryKey: ["pool-info", `id=${id}`],
  queryFn: async () => {
    return client
      .from("pools")
      .select(
        "id, chain_id, name, assets, incentives, affiliate_fee, description, action, timelock"
      )
      .eq("id", id)
      .single()
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  placeholderData: (previousData: any) => previousData,
});

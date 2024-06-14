import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type Pool = Pick<
  Tables<"pools">,
  | "id"
  | "chain_id"
  | "pool_address"
  | "name"
  | "assets"
  | "affiliate_fee"
  | "description"
  | "timelock"
  | "incentives"
  | "rewards"
  | "apy"
  | "tvl"
  | "action"
  | "is_active"
>;

export const getPoolQueryOptions = (
  client: TypedRoycoClient,
  id: string | null
) => ({
  queryKey: ["pool", `${id}`],
  queryFn: async () => {
    if (id === null) return new Error("No pool id provided");

    return client
      .from("pools")
      .select(
        "id, chain_id, pool_address, name, assets, affiliate_fee, description, timelock, incentives, rewards, apy, tvl, action, filled, is_active"
      )
      .eq("id", id)
      .single()
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  enabled: !!id,
});

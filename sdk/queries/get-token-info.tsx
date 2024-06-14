import { type TypedRoycoClient } from "@/sdk/client";
import type { Tables } from "@/sdk/types";

export type TokenInfo = Pick<
  Tables<"tokens">,
  | "id"
  | "chain_id"
  | "contract_address"
  | "symbol"
  | "name"
  | "image"
  | "decimals"
>;

export const getTokenInfoQueryOptions = (
  client: TypedRoycoClient,
  id: string
) => ({
  queryKey: ["token-info", `id=${id}`],
  queryFn: async () => {
    return client
      .from("tokens")
      .select("id, chain_id, contract_address, symbol, name, image, decimals")
      .eq("id", id)
      .single()
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
  placeholderData: (previousData) => previousData,
});

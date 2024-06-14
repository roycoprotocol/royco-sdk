import { type TypedRoycoClient } from "@/sdk/client";

export const getTokenPriceQueryOptions = (
  client: TypedRoycoClient,
  id: string
) => ({
  queryKey: ["token-price", `id=${id}`],
  queryFn: async () => {
    return client
      .from("tokens")
      .select("current_price")
      .eq("id", id)
      .single()
      .throwOnError()
      .then((result) => result.data);
  },
  keepPreviousData: true,
});

import type { TypedRoycoClient } from "@/sdk/client";

export type GetExpectedSpotQueryParams = {
  balance: number;
};

export type GetExpectedSpotQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetExpectedSpotQueryParams;

export const getExpectedSpotQueryFunction = async ({
  client,
  balance = 0,
}: GetExpectedSpotQueryOptionsParams) => {
  let query = client
    .from("leaderboard")
    .select("*")
    .or(`balance.lt.${balance},and(balance.eq.${balance},created_at.lt.now())`)
    .order("balance", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1);

  const { data } = await query.throwOnError();

  // If no data found, the new balance will be at the end
  if (!data || data.length === 0) {
    const { count } = await client
      .from("leaderboard")
      .select("*", { count: "exact", head: true });
    return (count || 0) + 1;
  }

  const expected_spot = data[0]?.rank ?? 1;

  return expected_spot;
};

export const getExpectedSpotQueryOptions = ({
  client,
  balance,
}: GetExpectedSpotQueryOptionsParams) => ({
  queryKey: [
    "get-expected-spot",
    {
      balance,
    },
  ],
  queryFn: () =>
    getExpectedSpotQueryFunction({
      client,
      balance,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

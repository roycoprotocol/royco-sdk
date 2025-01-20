import type { TypedRoycoClient } from "@/sdk/client";

export type GetLeaderboardStatsQueryOptionsParams = {
  client: TypedRoycoClient;
};

export const getLeaderboardStatsQueryFunction = async ({
  client,
}: GetLeaderboardStatsQueryOptionsParams) => {
  let query = client
    .from("leaderboard")
    .select("balance:balance.sum(), users:count()");

  const { data } = await query.throwOnError();

  return {
    balance: data?.[0]?.balance ?? 0,
    users: data?.[0]?.users ?? 0,
  };
};

export const getLeaderboardStatsQueryOptions = ({
  client,
}: GetLeaderboardStatsQueryOptionsParams) => ({
  queryKey: ["get-leaderboard-stats"],
  queryFn: () =>
    getLeaderboardStatsQueryFunction({
      client,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

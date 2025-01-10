import type { TypedRoycoClient } from "@/sdk/client";

export type GetLeaderboardQueryParams = {
  page?: number;
  page_size?: number;
};

export type GetLeaderboardQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetLeaderboardQueryParams;

export const getLeaderboardQueryFunction = async ({
  client,
  page = 0,
  page_size = 50,
}: GetLeaderboardQueryOptionsParams) => {
  let query = client
    .from("leaderboard")
    .select("*", { count: "exact", head: true })
    .limit(page_size)
    .range(page * page_size, page * page_size + page_size)
    .order("rank", { ascending: true });

  const { data, count } = await query.throwOnError();

  return {
    data,
    count,
  };
};

export const getLeaderboardQueryOptions = ({
  client,
  page,
  page_size,
}: GetLeaderboardQueryOptionsParams) => ({
  queryKey: [
    "get-leaderboard",
    {
      page,
      page_size,
    },
  ],
  queryFn: () =>
    getLeaderboardQueryFunction({
      client,
      page,
      page_size,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

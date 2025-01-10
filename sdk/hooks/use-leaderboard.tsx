import { useQuery } from "@tanstack/react-query";
import {
  getLeaderboardQueryOptions,
  type GetLeaderboardQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseLeaderboardParams = GetLeaderboardQueryParams;

export const useLeaderboard = ({ page, page_size }: UseLeaderboardParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getLeaderboardQueryOptions({
      client,
      page,
      page_size,
    }),
  });
};

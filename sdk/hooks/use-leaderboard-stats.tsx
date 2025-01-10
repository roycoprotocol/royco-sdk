import { useQuery } from "@tanstack/react-query";
import { getLeaderboardStatsQueryOptions } from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export const useLeaderboardStats = () => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getLeaderboardStatsQueryOptions({
      client,
    }),
  });
};

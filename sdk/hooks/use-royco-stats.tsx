import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getRoycoStatsQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";

export const useRoycoStats = () => {
  const client: RoycoClient = useRoycoClient();

  const { data, isLoading, isError, isRefetching } = useQuery(
    getRoycoStatsQueryOptions(client)
  );

  return { data, isLoading, isError, isRefetching };
};

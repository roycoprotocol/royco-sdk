import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getBaseChainsQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";

export const useBaseChains = () => {
  const client: RoycoClient = useRoycoClient();

  const { data, isLoading, isError, isRefetching } = useQuery(
    getBaseChainsQueryOptions(client)
  );

  return { data, isLoading, isError, isRefetching };
};

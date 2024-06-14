import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getBaseActionsQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";

export const useBaseActions = () => {
  const client: RoycoClient = useRoycoClient();

  const { data, isLoading, isError, isRefetching } = useQuery(
    getBaseActionsQueryOptions(client)
  );

  return { data, isLoading, isError, isRefetching };
};

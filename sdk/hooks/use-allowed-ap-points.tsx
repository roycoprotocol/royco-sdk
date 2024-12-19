import { useQuery } from "@tanstack/react-query";
import {
  getAllowedApPointsQueryOptions,
  type GetAllowedApPointsQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseAllowedApPointsParams = GetAllowedApPointsQueryParams;

export const useAllowedApPoints = ({ id }: UseAllowedApPointsParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getAllowedApPointsQueryOptions({
      client,
      id,
    }),
  });
};

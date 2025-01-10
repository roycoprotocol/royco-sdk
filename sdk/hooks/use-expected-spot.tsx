import { useQuery } from "@tanstack/react-query";
import {
  getExpectedSpotQueryOptions,
  type GetExpectedSpotQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseExpectedSpotParams = GetExpectedSpotQueryParams;

export const useExpectedSpot = ({ balance }: UseExpectedSpotParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getExpectedSpotQueryOptions({
      client,
      balance,
    }),
  });
};

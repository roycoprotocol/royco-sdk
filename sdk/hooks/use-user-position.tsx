import { useQuery } from "@tanstack/react-query";
import {
  getUserPositionQueryOptions,
  type GetUserPositionQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseUserPositionParams = GetUserPositionQueryParams;

export const useUserPosition = ({ account_address }: UseUserPositionParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getUserPositionQueryOptions({
      client,
      account_address,
    }),
  });
};

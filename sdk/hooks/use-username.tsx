import { useQuery } from "@tanstack/react-query";
import {
  getUsernameQueryOptions,
  type GetUsernameQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseUsernameParams = GetUsernameQueryParams;

export const useUsername = ({ account_address }: UseUsernameParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getUsernameQueryOptions({
      client,
      account_address,
    }),
  });
};

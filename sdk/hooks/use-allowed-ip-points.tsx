import { useQuery } from "@tanstack/react-query";
import {
  getAllowedIpPointsQueryOptions,
  type GetAllowedIpPointsQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseAllowedIpPointsParams = GetAllowedIpPointsQueryParams;

export const useAllowedIpPoints = ({
  chain_id,
  account_address,
  ...props
}: UseAllowedIpPointsParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getAllowedIpPointsQueryOptions({
      client,
      chain_id,
      account_address,
    }),
  });
};

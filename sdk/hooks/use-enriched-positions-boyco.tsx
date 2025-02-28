import { useQuery } from "@tanstack/react-query";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";
import {
  getEnrichedPositionsBoycoQueryOptions,
  type GetEnrichedPositionsBoycoQueryParams,
} from "@/sdk/queries";

export type UseEnrichedPositionsBoycoParams =
  GetEnrichedPositionsBoycoQueryParams & {
    enabled?: boolean;
  };

export const useEnrichedPositionsBoyco = ({
  account_address,
  market_id,
  page_index = 0,
  page_size = 20,
  filters = [],
  sorting = [],
  enabled = true,
}: UseEnrichedPositionsBoycoParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getEnrichedPositionsBoycoQueryOptions({
      client,
      account_address,
      market_id,
      page_index,
      page_size,
      filters,
      sorting,
    }),
    enabled,
  });
};

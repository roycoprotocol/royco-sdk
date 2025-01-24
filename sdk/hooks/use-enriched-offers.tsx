import { useQuery } from "@tanstack/react-query";
import {
  getEnrichedOffersQueryOptions,
  type GetEnrichedOffersQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseEnrichedOffersParams = GetEnrichedOffersQueryParams & {
  enabled?: boolean;
};

export const useEnrichedOffers = ({
  chain_id,
  market_type,
  market_id,
  creator,
  can_be_filled,
  page_index = 0,
  page_size = 20,
  filters = [],
  sorting = [],
  custom_token_data,
  enabled = true,
}: UseEnrichedOffersParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getEnrichedOffersQueryOptions({
      client,
      chain_id,
      market_type,
      market_id,
      creator,
      can_be_filled,
      page_index,
      page_size,
      filters,
      sorting,
      custom_token_data,
    }),
    enabled,
  });
};

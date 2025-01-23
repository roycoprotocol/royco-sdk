import { useQuery } from "@tanstack/react-query";
import {
  getEnrichedMarketsQueryOptions,
  type GetEnrichedMarketsQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseEnrichedMarketsParams = GetEnrichedMarketsQueryParams & {
  enabled?: boolean;
};

export const useEnrichedMarkets = ({
  chain_id,
  market_type,
  market_id,
  page_index = 0,
  page_size = 20,
  filters = [],
  sorting = [],
  search_key,
  is_verified,
  custom_token_data,
  enabled = true,
}: UseEnrichedMarketsParams) => {
  const client: RoycoClient = useRoycoClient();

  const props = useQuery({
    ...getEnrichedMarketsQueryOptions({
      client,
      chain_id,
      market_type,
      market_id,
      page_index,
      page_size,
      filters,
      sorting,
      search_key,
      is_verified,
      custom_token_data,
    }),
    enabled,
  });

  const data = props.data?.data ?? [];

  // const data = !!props.data
  //   ? // @ts-ignore
  //     (props.data.data as Array<EnrichedMarketDataType>)
  //   : null;

  const count = props.data?.count ?? 0;

  return {
    ...props,
    data,
    count,
  };
};

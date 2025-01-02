import { useQuery } from "@tanstack/react-query";
import {
  getEnrichedMarketsQueryOptions,
  type GetEnrichedMarketsQueryParams,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient, useRpcApiKeys } from "@/sdk/client";

export type UseEnrichedMarketsParams = GetEnrichedMarketsQueryParams & {
  enabled?: boolean;
};

export const useEnrichedMarkets = ({
  chain_id,
  market_type,
  market_id,
  page_index = 0,
  filters = [],
  sorting = [],
  search_key,
  is_verified,
  custom_token_data,
  enabled = true,
}: UseEnrichedMarketsParams) => {
  const client: RoycoClient = useRoycoClient();

  const RPC_API_KEYS = useRpcApiKeys();

  const props = useQuery({
    ...getEnrichedMarketsQueryOptions({
      client,
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      market_type,
      market_id,
      page_index,
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

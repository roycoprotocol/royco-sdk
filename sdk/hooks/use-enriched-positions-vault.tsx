import { useQuery } from "@tanstack/react-query";
import {
  useRpcApiKeys,
  type RoycoClient,
  type TypedRpcApiKeys,
  useRoycoClient,
} from "@/sdk/client";
import { getEnrichedPositionsVaultQueryOptions } from "@/sdk/queries";
import type {
  BaseQueryFilter,
  BaseSortingFilter,
  CustomTokenData,
} from "@/sdk/types";

export const useEnrichedPositionsVault = ({
  account_address,
  chain_id,
  market_id,
  custom_token_data,
  page_index = 0,
  filters = [],
  sorting,
  enabled = true,
}: {
  account_address: string;
  chain_id?: number;
  market_id?: string;
  custom_token_data?: CustomTokenData;
  page_index?: number;
  filters?: Array<BaseQueryFilter>;
  sorting?: Array<BaseSortingFilter>;
  enabled?: boolean;
})  => {
  const client: RoycoClient = useRoycoClient();

  const RPC_API_KEYS: TypedRpcApiKeys = useRpcApiKeys();

  return useQuery({
    ...getEnrichedPositionsVaultQueryOptions(
      client,
      RPC_API_KEYS,
      account_address,
      chain_id,
      market_id,
      custom_token_data,
      page_index,
      filters,
      sorting,
    ),
    enabled,
  });
};

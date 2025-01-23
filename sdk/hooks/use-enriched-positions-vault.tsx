import { useQuery } from "@tanstack/react-query";
import { useRpcApiKeys, type RoycoClient, useRoycoClient } from "@/sdk/client";
import {
  getEnrichedPositionsVaultQueryOptions,
  type GetEnrichedPositionsVaultQueryParams,
} from "@/sdk/queries";

export type UseEnrichedPositionsVaultParams =
  GetEnrichedPositionsVaultQueryParams & {
    enabled?: boolean;
  };

export const useEnrichedPositionsVault = ({
  account_address,
  chain_id,
  market_id,
  custom_token_data,
  page_index = 0,
  page_size = 20,
  filters = [],
  sorting = [],
  enabled = true,
}: UseEnrichedPositionsVaultParams) => {
  const client: RoycoClient = useRoycoClient();
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getEnrichedPositionsVaultQueryOptions({
      client,
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      account_address,
      chain_id,
      market_id,
      custom_token_data,
      page_index,
      page_size,
      filters,
      sorting,
    }),
    enabled,
  });
};

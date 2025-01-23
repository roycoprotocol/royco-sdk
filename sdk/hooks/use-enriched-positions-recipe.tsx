import { useQuery } from "@tanstack/react-query";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";
import {
  getEnrichedPositionsRecipeQueryOptions,
  type GetEnrichedPositionsRecipeQueryParams,
} from "@/sdk/queries";

export type UseEnrichedPositionsRecipeParams =
  GetEnrichedPositionsRecipeQueryParams & {
    enabled?: boolean;
  };

export const useEnrichedPositionsRecipe = ({
  account_address,
  chain_id,
  market_id,
  custom_token_data,
  page_index = 0,
  page_size = 20,
  filters = [],
  sorting = [],
  enabled = true,
}: UseEnrichedPositionsRecipeParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getEnrichedPositionsRecipeQueryOptions({
      client,
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

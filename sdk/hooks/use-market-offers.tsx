import { useQuery } from "@tanstack/react-query";
import {
  type GetMarketOffersQueryParams,
  getMarketOffersQueryOptions,
} from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export type UseMarketOffersParams = GetMarketOffersQueryParams & {
  enabled?: boolean;
};

export const useMarketOffers = ({
  chain_id,
  market_type,
  market_id,
  offer_side,
  quantity,
  custom_token_data,
  incentive_ids,
  incentive_amounts,
  enabled = true,
}: UseMarketOffersParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getMarketOffersQueryOptions({
      client,
      chain_id,
      market_type,
      market_id,
      offer_side,
      quantity,
      custom_token_data,
      incentive_ids:
        incentive_ids && incentive_ids.length > 0 ? incentive_ids : undefined,
      incentive_amounts:
        incentive_amounts && incentive_amounts.length > 0
          ? incentive_amounts
          : undefined,
    }),
    enabled,
  });
};

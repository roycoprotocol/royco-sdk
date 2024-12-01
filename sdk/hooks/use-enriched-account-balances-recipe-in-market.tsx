import { useQuery } from "@tanstack/react-query";
import { getEnrichedAccountBalancesRecipeInMarketQueryOptions } from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";
import type { CustomTokenData } from "@/sdk/types";

export const useEnrichedAccountBalancesRecipeInMarket = ({
  chain_id,
  market_id,
  account_address,
  custom_token_data,
  enabled = true,
}: {
  chain_id: number;
  market_id: string;
  account_address: string;
  custom_token_data?: CustomTokenData;
  enabled?: boolean;
})  => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getEnrichedAccountBalancesRecipeInMarketQueryOptions(
      client,
      chain_id,
      market_id,
      account_address,
      custom_token_data,
    ),
    enabled,
  });
};

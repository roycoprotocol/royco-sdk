import { type TypedRoycoClient } from "@/sdk/client";
import { getSupportedChain } from "@/sdk/utils";
import type { CustomTokenData } from "@/sdk/types";
import type { UseQueryOptions } from "@tanstack/react-query";

export const getEnrichedRoycoStatsQueryOptions = (
  client: TypedRoycoClient,
  custom_token_data?: CustomTokenData,
): UseQueryOptions => ({
  queryKey: ["get-enriched-royco-stats"],
  queryFn: async () => {
    const result = await client.rpc("get_enriched_royco_stats", {
      custom_token_data,
    });

    let total_volume = 0;
    let total_tvl = 0;
    let total_incentives = 0;

    if (
      result &&
      "data" in result &&
      Array.isArray(result.data) &&
      result.data.length > 0
    ) {
      for (const item of result.data) {
        if (item.chain_id !== null) {
          const chain = getSupportedChain(item.chain_id);

          if (!!chain && chain.testnet === false) {
            total_volume += item.total_volume ?? 0;
            total_tvl += item.total_tvl ?? 0;
            total_incentives += item.total_incentives ?? 0;
          }
        }
      }
    }

    return {
      total_volume,
      total_tvl,
      total_incentives,
    };
  },

  placeholderData: (previousData: any) => previousData,
  staleTime: 1000 * 60 * 1, // 1 min
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

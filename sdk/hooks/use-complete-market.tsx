import { useQuery } from "@tanstack/react-query";
import {
  type GetCompleteMarketQueryParams,
  getCompleteMarketQueryOptions,
} from "@/sdk/queries";
import { useRoycoClient, useRpcApiKeys } from "@/sdk/client";

export type UseCompleteMarketParams = GetCompleteMarketQueryParams;

export const useCompleteMarket = ({
  chain_id,
  market_type,
  market_id,
}: UseCompleteMarketParams) => {
  const client = useRoycoClient();
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getCompleteMarketQueryOptions({
      client,
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      market_type,
      market_id,
    }),
  });
};

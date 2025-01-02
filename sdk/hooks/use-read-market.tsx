import { RoycoMarketType, type TypedRoycoMarketType } from "@/sdk/market";
import { useRpcApiKeys } from "../client";
import { useQuery } from "@tanstack/react-query";
import { getReadMarketQueryFunction } from "../queries";

export type UseReadMarketParams = {
  chain_id: number;
  market_type: TypedRoycoMarketType;
  market_id: string;
  enabled?: boolean;
};

export const useReadMarket = ({
  chain_id,
  market_type,
  market_id,
  enabled = true,
}: UseReadMarketParams) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    queryKey: [
      "read-market",
      {
        chain_id,
        market_id,
        market_type,
      },
    ],
    queryFn: () =>
      getReadMarketQueryFunction({
        chain_id,
        market_type: market_type === RoycoMarketType.recipe.id ? 0 : 1,
        market_id,
        RPC_API_KEYS,
      }),
    enabled,
  });
};

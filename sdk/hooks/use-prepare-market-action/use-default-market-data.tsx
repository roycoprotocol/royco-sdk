import type { TypedRoycoMarketType } from "@/sdk/market";
import type { ReadMarketDataType } from "@/sdk/queries";

import { RoycoMarketType } from "@/sdk/market";
import { useReadMarket, useEnrichedMarkets } from "@/sdk/hooks";

export const useDefaultMarketData = ({
  chain_id,
  market_id,
  market_type,
  enabled = true,
}: {
  chain_id: number;
  market_id: string;
  market_type: TypedRoycoMarketType;
  enabled?: boolean;
}) => {
  // Get base market data (protocol fee and frontend fee + enter/exit market scripts (for recipe markets))
  const propsReadMarket = useReadMarket({
    chain_id,
    market_type,
    market_id,
    enabled,
  });

  // Get enriched market data
  const propsEnrichedMarket = useEnrichedMarkets({
    chain_id,
    market_type:
      market_type === RoycoMarketType.recipe.id
        ? RoycoMarketType.recipe.value
        : RoycoMarketType.vault.value,
    market_id,
    enabled,
  });

  return {
    baseMarket: propsReadMarket.data,
    enrichedMarket: propsEnrichedMarket.data?.[0],
    isLoading: propsReadMarket.isLoading || propsEnrichedMarket.isLoading,
  };
};

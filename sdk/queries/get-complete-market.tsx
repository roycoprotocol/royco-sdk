import type { TypedRoycoClient, TypedRpcApiKeys } from "@/sdk/client";
import { getSupportedToken, SupportedToken } from "@/sdk/constants";
import {
  EnrichedMarketDataType,
  getEnrichedMarketsQueryFunction,
} from "./get-enriched-markets";
import {
  BaseMarketDataType,
  getBaseMarketQueryFunction,
} from "./get-base-market";

export type GetCompleteMarketQueryParams = {
  chain_id: number;
  market_type: number;
  market_id: string;
};

export type GetCompleteMarketQueryOptionsParams = {
  client: TypedRoycoClient;
  RPC_API_KEYS: TypedRpcApiKeys;
} & GetCompleteMarketQueryParams;

export type CompleteMarketDataType = BaseMarketDataType &
  EnrichedMarketDataType;

export const getCompleteMarketQueryFunction = async ({
  client,
  chain_id,
  market_type,
  market_id,
  RPC_API_KEYS,
}: GetCompleteMarketQueryOptionsParams) => {
  try {
    const [base_market, enriched_markets] = await Promise.all([
      getBaseMarketQueryFunction({
        RPC_API_KEYS,
        chain_id,
        market_type,
        market_id,
      }),
      getEnrichedMarketsQueryFunction({
        client,
        RPC_API_KEYS,
        chain_id,
        market_type,
        market_id,
      }),
    ]);

    const enriched_market = enriched_markets.data?.[0];

    if (!enriched_market) {
      throw new Error("Enriched market not found");
    }

    if (!base_market) {
      throw new Error("Base market not found");
    }

    return {
      ...base_market,
      ...enriched_market,
    };
  } catch (err) {
    return null;
  }
};

export const getCompleteMarketQueryOptions = ({
  client,
  chain_id,
  market_type,
  market_id,
  RPC_API_KEYS,
}: GetCompleteMarketQueryOptionsParams) => ({
  queryKey: [
    "get-complete-market",
    {
      chain_id,
      market_type,
      market_id,
    },
  ],
  queryFn: () =>
    getCompleteMarketQueryFunction({
      client,
      RPC_API_KEYS,
      chain_id,
      market_type,
      market_id,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

import { TypedRoycoClient } from "@/sdk/client";
import { getSupportedMarket } from "@/sdk/constants";
import {
  getEnrichedMarketsQueryFunction,
  type EnrichedMarketDataType,
} from "@/sdk/queries";
import { CustomTokenData } from "@/sdk/types";
import { getBeraApy } from "./manage-bera-apy";
import { getMarketAssetType } from "./manage-multiplier";
import { getBuckets } from "./get-buckets";

export const BERA_TOKEN_ID = "1-0xbe9abe9abe9abe9abe9abe9abe9abe9abe9abe9a";

export const DEFAULT_BERA_TOKEN_DATA = {
  fdv: 2000000000,
  total_supply: 500000000,
};

export const getAllBeraMarkets = async ({
  client,
  customTokenData,
}: {
  client: TypedRoycoClient;
  customTokenData: CustomTokenData;
}) => {
  const allBeraMarkets = await getEnrichedMarketsQueryFunction({
    client,
    chain_id: 1,
    market_type: 0,
    page_index: 0,
    page_size: 1000,
    custom_token_data: customTokenData,
    category: "boyco",
    is_verified: true,
  });

  let markets: EnrichedMarketDataType[] = [];
  if (!!allBeraMarkets.data) {
    markets = allBeraMarkets.data;
  }

  return markets;
};

export const calculateBeraYield = ({
  enrichedMarket,
  customTokenData,
  markets,
}: {
  enrichedMarket: EnrichedMarketDataType;
  customTokenData: CustomTokenData;
  markets: EnrichedMarketDataType[];
}) => {
  let annual_change_ratio = 0;

  try {
    const beraTokenData = customTokenData.find(
      (token) => token.token_id === BERA_TOKEN_ID,
    );

    let bera_fdv = DEFAULT_BERA_TOKEN_DATA.fdv;
    let bera_total_supply = DEFAULT_BERA_TOKEN_DATA.total_supply;

    if (
      !!beraTokenData &&
      !!beraTokenData.fdv &&
      !!beraTokenData.total_supply
    ) {
      bera_fdv = Number(beraTokenData.fdv);
      bera_total_supply = Number(beraTokenData.total_supply);
    }

    let bera_price = bera_fdv / bera_total_supply;

    if (bera_total_supply === 0 || isNaN(bera_price)) {
      bera_price = 0;
    }

    const market = enrichedMarket;
    const beraInfo = {
      beraFDV: bera_fdv,
      beraSupply: bera_total_supply,
    };
    const assetType = getMarketAssetType(enrichedMarket);
    const buckets = getBuckets(markets);

    const bera_annual_change_ratio = getBeraApy(
      market,
      beraInfo,
      assetType,
      buckets,
    );

    if (!isNaN(bera_annual_change_ratio)) {
      annual_change_ratio = bera_annual_change_ratio;
    }
  } catch (error) {}

  return annual_change_ratio;
};

import { TypedRoycoClient } from "../client";
import {
  EnrichedMarketDataType,
  getEnrichedMarketsQueryFunction,
} from "../queries/get-enriched-markets";
import { CustomTokenData } from "../types";
import {
  SONIC_CHAIN_ID,
  sonicMarketMap,
  TOTAL_SONIC_GEM_DISTRIBUTION,
} from "./sonic-market-map";
import { SONIC_ROYCO_GEM_BOOST_ID } from "./sonic-points-map";

export const getAllSonicMarkets = async ({
  client,
  customTokenData,
}: {
  client: TypedRoycoClient;
  customTokenData: CustomTokenData;
}) => {
  const allSonicMarkets = await getEnrichedMarketsQueryFunction({
    client,
    chain_id: SONIC_CHAIN_ID,
    market_type: 0,
    page_index: 0,
    page_size: 1000,
    custom_token_data: customTokenData,
    is_verified: true,
  });

  let markets: EnrichedMarketDataType[] = [];
  if (!!allSonicMarkets.data) {
    markets = allSonicMarkets.data;
  }

  return markets;
};

export const calculateSonicYield = ({
  enrichedMarket,
  customTokenData,
  markets,
}: {
  enrichedMarket: EnrichedMarketDataType;
  customTokenData: CustomTokenData;
  markets: EnrichedMarketDataType[];
}) => {
  const gemBoostTokenData = customTokenData.find(
    (token) => token.token_id === SONIC_ROYCO_GEM_BOOST_ID,
  );

  let gemBoostTokenPrice = 0;
  if (!!gemBoostTokenData) {
    gemBoostTokenPrice = parseFloat(gemBoostTokenData.price || "0");
  }

  const uniqueAppName = [
    ...new Set(sonicMarketMap.map((market) => market.app)),
  ];
  if (uniqueAppName.length === 0) {
    return 0;
  }
  const appSonicGemDistribution =
    TOTAL_SONIC_GEM_DISTRIBUTION / uniqueAppName.length;

  const appName = sonicMarketMap.find(
    (market) => market.id === enrichedMarket.id,
  )?.app;
  const appSonicMarket = sonicMarketMap.filter(
    (market) => market.app === appName,
  );
  if (appSonicMarket.length === 0) {
    return 0;
  }
  const appMarketSonicGemDistribution =
    appSonicGemDistribution / appSonicMarket.length;

  const sonicGemBoostIncentiveUsd =
    appMarketSonicGemDistribution * gemBoostTokenPrice;

  const sonicLockedQuantityUsd =
    markets.reduce(
      (acc, market) => acc + (market.locked_quantity_usd || 0),
      0,
    ) || 1;

  const sonicLockupTime = Number(enrichedMarket.lockup_time ?? "1");

  let annual_change_ratio = 0;

  if (
    sonicLockedQuantityUsd > 0 &&
    !isNaN(sonicLockupTime) &&
    sonicLockupTime > 0
  ) {
    annual_change_ratio =
      (sonicGemBoostIncentiveUsd / sonicLockedQuantityUsd) *
      ((365 * 24 * 60 * 60) / sonicLockupTime);
  }

  return annual_change_ratio;
};

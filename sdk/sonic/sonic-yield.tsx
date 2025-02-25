import { EnrichedMarketDataType } from "../queries/get-enriched-markets";
import { CustomTokenData } from "../types";
import {
  sonicMarketMap,
  TOTAL_SONIC_GEM_DISTRIBUTION,
} from "./sonic-market-map";
import { SONIC_ROYCO_GEM_BOOST_ID } from "./sonic-points-map";

export const calculateSonicYield = ({
  enrichedMarket,
  customTokenData,
}: {
  enrichedMarket: EnrichedMarketDataType;
  customTokenData: CustomTokenData;
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
  const appSonicGemDistribution =
    TOTAL_SONIC_GEM_DISTRIBUTION / uniqueAppName.length;

  const appName = sonicMarketMap.find(
    (market) => market.id === enrichedMarket.id,
  )?.app;
  const appSonicMarket = sonicMarketMap.filter(
    (market) => market.app === appName,
  );
  const appMarketSonicGemDistribution =
    appSonicGemDistribution / appSonicMarket.length;

  const sonicGemBoostIncentiveUsd =
    appMarketSonicGemDistribution * gemBoostTokenPrice;
  const sonicLockedQuantityUsd = parseFloat(
    enrichedMarket.locked_quantity || "0",
  );

  const new_apr = sonicGemBoostIncentiveUsd / (sonicLockedQuantityUsd || 1);
  if (isNaN(new_apr) || new_apr < 0) {
    return 0;
  }

  return new_apr;
};

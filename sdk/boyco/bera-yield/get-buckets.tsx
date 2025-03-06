import { type EnrichedMarketDataType } from "@/sdk/queries";
import { getMarketAssetType, getMarketMultiplier } from "./manage-multiplier";
import { MULTIPLIER_ASSET_TYPE } from "./manage-multiplier";
import { sumBy } from "lodash";

function getDuration(market: EnrichedMarketDataType): number {
  return market.lockup_time ? Number(market.lockup_time) / (60 * 60 * 24) : 90;
}

export const getBuckets = (markets: EnrichedMarketDataType[]) => {
  const MajorMarkets = markets.filter(
    (market) => getMarketAssetType(market) === MULTIPLIER_ASSET_TYPE.MAJOR_ONLY,
  );
  const ThirdPartyMarkets = markets.filter(
    (market) => getMarketAssetType(market) !== MULTIPLIER_ASSET_TYPE.MAJOR_ONLY,
  );

  const majorBucketWeight = sumBy(MajorMarkets, (market) => {
    const tvl = market.locked_quantity_usd ?? 0;
    const multiplier = +getMarketMultiplier(market);
    return tvl * multiplier * getDuration(market);
  });

  const thirdPartyBucketWeight = sumBy(ThirdPartyMarkets, (market) => {
    const tvl = market.locked_quantity_usd ?? 0;
    const multiplier = +getMarketMultiplier(market);
    return tvl * multiplier * getDuration(market);
  });

  return {
    majorBucketWeight,
    thirdPartyBucketWeight,
  };
};

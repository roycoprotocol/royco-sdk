import { type EnrichedMarketDataType } from "@/sdk/queries";
import { getMarketAssetType, getMarketMultiplier } from "./manage-multiplier";
import { MULTIPLIER_ASSET_TYPE } from "./manage-multiplier";
import { sumBy } from "lodash";

export const getBuckets = (markets: EnrichedMarketDataType[]) => {
  const MajorMarkets = markets.filter(
    (market) =>
      getMarketAssetType(market.input_token_data) ===
      MULTIPLIER_ASSET_TYPE.MAJOR_ONLY,
  );
  const ThirdPartyMarkets = markets.filter(
    (market) =>
      getMarketAssetType(market.input_token_data) ===
      MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  );

  const majorBucketWeight = sumBy(MajorMarkets, (market) => {
    const tvl = market.locked_quantity_usd ?? 0;
    const multiplier = +getMarketMultiplier(market);
    return tvl * multiplier;
  });

  const thirdPartyBucketWeight = sumBy(ThirdPartyMarkets, (market) => {
    const tvl = market.locked_quantity_usd ?? 0;
    const multiplier = +getMarketMultiplier(market);
    return tvl * multiplier;
  });

  return {
    majorBucketWeight,
    thirdPartyBucketWeight,
  };
};

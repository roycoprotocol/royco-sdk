import { type EnrichedMarketDataType } from "@/sdk/queries";
import {
  getMarketMultiplier,
  MULTIPLIER_ASSET_TYPE,
} from "./manage-multiplier";

type BeraYieldContextType = {
  buckets: BeraBuckets | undefined;
  beraInfo: BeraInfoContextType;
  setBeraInfo: (beraInfo: BeraInfoContextType) => void;
};

export type BeraBuckets = {
  majorBucketWeight: number;
  thirdPartyBucketWeight: number;
};

export type BeraInfoContextType = {
  beraFDV: number;
  beraSupply: number;
};

/**
 * Calculates the Annual Percentage Yield (APY) for BERA token rewards in a given market
 *
 * @param {EnrichedMarketDataType} market - The market data containing TVL, lockup time, and token information
 * @param {BeraInfoContextType} beraInfo - Context containing BERA token information including FDV and supply
 * @param {Function} getBucketWeight - Function that returns the weight for a given asset type bucket
 * @returns {number} The calculated APY for BERA rewards, returns 0 if market TVL is not available
 *
 * @description
 * This function calculates the BERA APY based on several factors:
 * - Market TVL and multiplier
 * - BERA price derived from FDV and supply
 * - Lockup period of the market
 * - Asset type bucket weights
 * - BERA supply allocation on Boyco
 *
 * The calculation takes into account:
 * 1. Market TVL adjusted by multiplier
 * 2. Asset type bucket weight (Major vs Other)
 * 3. BERA supply distribution
 * 4. Rebase incentives based on market weight
 * 5. Annualization based on lockup period
 */
export const getBeraApy = (
  market: EnrichedMarketDataType,
  beraInfo: BeraInfoContextType,
  assetType: MULTIPLIER_ASSET_TYPE,
  buckets: BeraBuckets,
) => {
  const multiplier = +getMarketMultiplier(market);

  // console.log("multiplier", multiplier);

  const marketTVL = market.total_value_locked;
  if (!marketTVL) return 0;

  // console.log("marketTVL", marketTVL);

  const beraPrice = beraInfo.beraFDV / beraInfo.beraSupply;

  // console.log("beraPrice", beraPrice);

  const lockupTime =
    Number(market.lockup_time) === 0 ? 7776000 : Number(market.lockup_time);
  const lockupPeriod = lockupTime * 1000;
  const year = 31536000000; // 365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

  const marketTVLMultiplied = marketTVL * multiplier;

  // console.log("marketTVLMultiplied", marketTVLMultiplied);

  const marketTypeBucketWeight =
    assetType === MULTIPLIER_ASSET_TYPE.MAJOR_ONLY
      ? buckets.majorBucketWeight
      : buckets.thirdPartyBucketWeight;

  // console.log("marketTypeBucketWeight", marketTypeBucketWeight);

  const weightOfBucketOnBoyco =
    assetType === MULTIPLIER_ASSET_TYPE.MAJOR_ONLY ? 0.45 : 0.55;
  const beraSupplyOnBoyco = 10000000;

  // console.log("beraSupplyOnBoyco", beraSupplyOnBoyco);

  const currentMarketWeight = marketTVLMultiplied / marketTypeBucketWeight;
  // console.log("BERA APY-Market weight", currentMarketWeight);

  const beraSupplyInBucket =
    beraSupplyOnBoyco * beraPrice * weightOfBucketOnBoyco;
  // console.log("BERA APY-Bera supply on boyco multiplied", beraSupplyInBucket);

  const rebaseIncentives = currentMarketWeight * beraSupplyInBucket;
  // console.log("BERA APY-Rebase incentives", rebaseIncentives);

  const rebasedIncentiveOnMarketTVL = rebaseIncentives / marketTVL;
  // console.log(
  //   "BERA APY-Rebased incentive for market TVL",
  //   rebasedIncentiveOnMarketTVL,
  // );

  const missingPeriod = year / lockupPeriod;
  // console.log("BERA APY-Missing period", missingPeriod);

  const beraApy = rebasedIncentiveOnMarketTVL * missingPeriod;

  // console.log("BERA APY", beraApy);

  return beraApy;
};

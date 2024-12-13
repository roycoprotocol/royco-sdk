import { MarketMap1 } from "./1";
import { MarketMap11155111 } from "./11155111";
import { MarketMap42161 } from "./42161";
import { MarketMap8453 } from "./8453";
import { MarketMap21000000 } from "./21000000";
import { MarketMap98865 } from "./98865";

import type { SupportedMarket } from "./utils";

export {
  MarketMap1,
  MarketMap11155111,
  MarketMap42161,
  MarketMap8453,
  MarketMap21000000,
  MarketMap98865,
};

export const SupportedMarketMap = {
  ...MarketMap1,
  ...MarketMap11155111,
  ...MarketMap42161,
  ...MarketMap8453,
  ...MarketMap21000000,
  ...MarketMap98865,
} as Record<string, SupportedMarket>;

export const MarketList = Object.values(SupportedMarketMap);

export const isVerifiedMarket = (
  marketId: string | undefined | null,
): boolean => {
  if (!marketId) return false;

  return !!SupportedMarketMap[marketId];
};

export const getVerifiedMarket = (
  marketId: string | undefined | null,
): SupportedMarket | undefined => {
  if (!marketId) return undefined;

  return SupportedMarketMap[marketId];
};

export const getSupportedMarket = (
  key: string | null | undefined,
): SupportedMarket | undefined => {
  if (!key) return undefined;

  const market = SupportedMarketMap[key];

  if (!market) return undefined;

  return market;
};

import { MarketMap1 } from "./1";
import { MarketMap11155111 } from "./11155111";
import { MarketMap42161 } from "./42161";
import { MarketMap421614 } from "./421614";
import { MarketMap8453 } from "./8453";
import { MarketMap84532 } from "./84532";

import type { SupportedMarket } from "./utils";

export const SupportedMarketMap = {
  ...MarketMap1,
  ...MarketMap11155111,
  ...MarketMap42161,
  ...MarketMap421614,
  ...MarketMap8453,
  ...MarketMap84532,
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

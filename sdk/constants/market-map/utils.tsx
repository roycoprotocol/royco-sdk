import { createPublicClient } from "viem";

import type { RoycoClient } from "@/sdk/client";
import type { SupportedToken } from "@/sdk/constants";

export type BaseYield = {
  token_id: string;
  label?: string;
  annual_change_ratio: ({
    roycoClient,
    chainClient,
  }: {
    roycoClient: RoycoClient;
    chainClient: ReturnType<typeof createPublicClient>;
  }) => Promise<number>;
};

export type BaseIncentive = {
  token_id: string;
  label?: string;
  value: ({
    roycoClient,
    chainClient,
  }: {
    roycoClient: RoycoClient;
    chainClient: ReturnType<typeof createPublicClient>;
  }) => Promise<string>;
};

export type SupportedMarket = {
  id: string;
  name: string;
  description: string;
  is_verified: boolean;
  native_yield?: Array<BaseYield>;
  underlying_yield?: ({
    roycoClient,
    chainClient,
  }: {
    roycoClient: RoycoClient;
    chainClient: ReturnType<typeof createPublicClient>;
  }) => Promise<number>;
  external_incentives?: Array<BaseIncentive>;
  category?: string;
};

export const defineMarket = (market: SupportedMarket) => market;

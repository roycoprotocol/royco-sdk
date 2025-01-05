import { createPublicClient } from "viem";

import type { RoycoClient } from "@/sdk/client";
import type { SupportedToken } from "@/sdk/constants";

export type SupportedMarket = {
  id: string;
  name: string;
  description: string;
  is_verified: boolean;
  native_yield?: ({
    roycoClient,
    chainClient,
  }: {
    roycoClient: RoycoClient;
    chainClient: ReturnType<typeof createPublicClient>;
  }) => Promise<{
    native_annual_change_ratio: number;
    native_annual_change_ratios: Array<
      SupportedToken & {
        label: string;
        annual_change_ratio: number;
      }
    >;
  }>;
  underlying_vault_yield?: ({
    roycoClient,
    chainClient,
  }: {
    roycoClient: RoycoClient;
    chainClient: ReturnType<typeof createPublicClient>;
  }) => Promise<{
    underlying_annual_change_ratio: number;
  }>;
};

export const defineMarket = (market: SupportedMarket) => market;

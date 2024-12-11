import { SupportedToken } from "../token-map";

export type SupportedMarket = {
  id: string;
  name: string;
  description: string;
  is_verified: boolean;
  native_yield?: Promise<{
    native_annual_change_ratio: number;
    native_annual_change_ratios: Array<
      SupportedToken & {
        label: string;
        annual_change_ratio: number;
      }
    >;
  }>;
};

export const defineMarket = (market: SupportedMarket) => market;

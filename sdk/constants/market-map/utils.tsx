export type SupportedMarket = {
  id: string;
  name: string;
  description: string;
  is_verified: boolean;
};

export const defineMarket = (market: SupportedMarket) => market;

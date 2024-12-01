export type SupportedToken = {
  id: string;
  chain_id: number;
  contract_address: string;
  name: string;
  symbol: string;
  image: string;
  decimals: number;
  source: "coinmarketcap" | "coingecko" | "external";
  search_id: string;
  type: "token" | "point";
};

export const defineToken = (token: SupportedToken) => token;

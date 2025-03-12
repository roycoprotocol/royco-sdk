export type SupportedToken = {
  id: string;
  chain_id: number;
  contract_address: string;
  name: string;
  symbol: string;
  image: string;
  decimals: number;
  source: "coinmarketcap" | "coingecko" | "external" | "lp" | "enso" | "pendle";
  search_id: string;
  type: "token" | "point" | "lp";
  token0?: string;
  token1?: string;
};

export const defineToken = (token: SupportedToken) => token;

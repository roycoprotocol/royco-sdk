export type BaseQueryFilter = {
  id: string;
  value: string | number | boolean;
  join?: "AND" | "OR";
  condition?: "NOT";
};

export type BaseSortingFilter = {
  id: string;
  desc: boolean;
};

export type CustomTokenDataElementType = {
  token_id: string;
  price?: string;
  total_supply?: string;
  fdv?: string;
};

export type CustomTokenData = CustomTokenDataElementType[];

export type RPC_API_KEYS_OBJECT_TYPE = {
  [key: number]: string;
};

export interface RawPositionVault {
  id: string; // <CHAIN_ID>_<MARKET_ID>_<ACCOUNT_ADDRESS>
  chainId: string; // Hardcoded
  accountAddress: string; // Wallet Address
  marketId: string; // Wrapped Vault Address
  shares: string; // This represents wrapped vault shares
  token0Id: string; // Input Token
  token0Amount: string; // Input Token Amount
  token1Ids: string[]; // Incentive Tokens, this represents claimed incentive token ids
  token1Amounts: string[]; // Incentive Amounts, this represents claimed incentive token amounts
  rawMarketRefId: {
    id: string; // <CHAIN_ID>_<MARKET_TYPE>_<MARKET_ID>
  };
}

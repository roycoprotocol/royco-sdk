export interface Market {
  id: string; // rawMarketRefId from Subgraph, <CHAIN_ID>_<MARKET_TYPE>_<MARKET_HASH>
  name: string; // Name of the market
  description: string; // Description of the market
  lockup_time: string; // Lockup time in seconds
  input_token_id: string; // Input token id, <CHAIN_ID>-<TOKEN_ADDRESS>
  input_token_name: string; // Input token name
  input_token_symbol: string; // Input token symbol
  input_token_decimals: number; // Input token decimals
  incentive_token_id: string; // Incentive token id, <CHAIN_ID>-<TOKEN_ADDRESS>
  incentive_token_name: string; // Incentive token name
  incentive_token_symbol: string; // Incentive token symbol
  incentive_token_decimals: number; // Incentive token decimals
}

export interface RawPositionTokenBalanceRecipe {
  id: string; // id from Subgraph, <CHAIN_ID>_<WEIROLL_WALLET_ADDRESS>_<TOKEN_CLASS>_<TOKEN_ID>, Token class is 0 for input token and 1 for incentive token
  weirollWallet: string; // Weiroll wallet address
  accountAddress: string; // Account address
  tokenClass: string; // Token class
  tokenId: string; // Token id
  tokenAmount: string; // Token amount
  rawMarketRefId: {
    id: string; // rawMarketRefId from Subgraph, <CHAIN_ID>_<MARKET_TYPE>_<MARKET_HASH>
  };
}

export interface PositionByMarket {
  marketId: string; // rawMarketRefId
  name: string; // Name of the market
  description: string; // Description of the market
  lockup_time: string; // Lockup time in seconds

  inputTokenId: string; // tokenId when tokenClass is 0
  inputTokenName: string; // Input token name
  inputTokenSymbol: string; // Input token symbol
  inputTokenDecimals: number; // Input token decimals
  inputRawAmount: string; // Total tokenAmount of all positions when tokenClass is 0
  inputTokenAmount: string; // Total tokenAmount of all positions when tokenClass is 0
  inputTokenAmountUSD: number; // Total tokenAmount of all positions when tokenClass is 0 in USD

  incentiveId: string; // tokenId when tokenClass is 1
  incentiveTokenName: string; // Incentive token name
  incentiveTokenSymbol: string; // Incentive token symbol
  incentiveTokenDecimals: number; // Incentive token decimals
  incentiveRawAmount: string; // Total tokenAmount of all positions when tokenClass is 1
  incentiveTokenAmount: string; // Total tokenAmount of all positions when tokenClass is 1
}

export interface PositionByAccount {
  accountAddress: string; // Account address

  inputTokenId: string; // tokenId when tokenClass is 0
  inputTokenName: string; // Input token name
  inputTokenSymbol: string; // Input token symbol
  inputTokenDecimals: number; // Input token decimals
  inputRawAmount: string; // Total tokenAmount of all positions when tokenClass is 0
  inputTokenAmount: string; // Total tokenAmount of all positions when tokenClass is 0
  inputTokenAmountUSD: number; // Total tokenAmount of all positions when tokenClass is 0 in USD

  incentiveId: string; // tokenId when tokenClass is 1
  incentiveTokenName: string; // Incentive token name
  incentiveTokenSymbol: string; // Incentive token symbol
  incentiveTokenDecimals: number; // Incentive token decimals
  incentiveRawAmount: string; // Total tokenAmount of all positions when tokenClass is 1
  incentiveTokenAmount: string; // Total tokenAmount of all positions when tokenClass is 1
}

export interface PositionByMarketByAccount {
  id: string; // concat of marketId and accountAddress with "_" as separator

  marketId: string; // rawMarketRefId
  name: string; // Name of the market
  description: string; // Description of the market
  lockup_time: string; // Lockup time in seconds

  accountAddress: string; // Account address

  inputTokenId: string; // tokenId when tokenClass is 0
  inputTokenName: string; // Input token name
  inputTokenSymbol: string; // Input token symbol
  inputTokenDecimals: number; // Input token decimals
  inputRawAmount: string; // Total tokenAmount of all positions when tokenClass is 0
  inputTokenAmount: string; // Total tokenAmount of all positions when tokenClass is 0
  inputTokenAmountUSD: number; // Total tokenAmount of all positions when tokenClass is 0 in USD

  incentiveId: string; // tokenId when tokenClass is 1
  incentiveTokenName: string; // Incentive token name
  incentiveTokenSymbol: string; // Incentive token symbol
  incentiveTokenDecimals: number; // Incentive token decimals
  incentiveRawAmount: string; // Total tokenAmount of all positions when tokenClass is 1
  incentiveTokenAmount: string; // Total tokenAmount of all positions when tokenClass is 1
}

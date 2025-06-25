/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum ActivitySubCategory {
  Deposit = "deposit",
  Withdraw = "withdraw",
  Claim = "claim",
  WithdrawRequested = "withdraw-requested",
  WithdrawCancelled = "withdraw-cancelled",
  WithdrawComplete = "withdraw-complete",
}

export enum ActivityCategory {
  Recipe = "recipe",
  Boring = "boring",
}

export interface CustomTokenDataElement {
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price?: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv?: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply?: number;
}

export interface TokenQuoteRequestBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface TokenQuote {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
}

export interface TokenQuoteResponse {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
}

export interface Filter {
  /**
   * Filter ID
   * Column ID to apply the filter on
   * @example "chainId"
   */
  id: string;
  /**
   * Filter Value
   * Value to filter by
   * @example "146"
   */
  value: string | number | boolean | string[] | number[];
  /**
   * Filter Condition
   * Condition to apply the filter on -- if not provided, defaults to "eq"
   * @default "eq"
   * @example "gte"
   */
  condition?: string;
  /**
   * Filter Join
   * Join to union the filters on -- if not provided, defaults to "and"
   * @default "and"
   * @example "or"
   */
  join?: string;
}

export interface Sorting {
  /**
   * Sorting ID
   * Column ID to sort by
   * @example "tvlUsd"
   */
  id: string;
  /**
   * Sorting Order
   * Sorting order -- if not provided, defaults to "desc"
   * @default false
   * @example true
   */
  desc?: boolean;
}

export interface RequestPage {
  /**
   * Page Index
   * Page index
   * @example 1
   */
  index?: number;
  /**
   * Page Size
   * Page size
   * @example 3
   */
  size?: number;
}

export interface TokenDirectoryRequestBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface ResponsePage {
  /**
   * Page Index
   * Page index
   * @example 1
   */
  index: number;
  /**
   * Page Size
   * Page size
   * @example 3
   */
  size: number;
  /**
   * Page Total
   * Page total
   * @example 10
   */
  total: number;
}

export interface TokenDirectoryResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  data: TokenQuote[];
}

export interface BaseRequestBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface BaseEnrichedTokenDataWithRemainingAmounts {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Remaining Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  remainingRawAmount: string;
  /**
   * Remaining Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  remainingTokenAmount: number;
  /**
   * Remaining Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  remainingTokenAmountUsd: number;
}

export interface RecipeOffer {
  id: string;
  rawMarketRefId: string;
  chainId: number;
  marketType: number;
  marketId: string;
  offerSide: number;
  offerId: string;
  accountAddress: string;
  fundingVault: string;
  inputToken: BaseEnrichedTokenDataWithRemainingAmounts;
  incentiveTokens: BaseEnrichedTokenDataWithRemainingAmounts[];
  expiry: string;
  status: "invalid" | "active" | "cancelled" | "expired" | "filled";
  transactionHash: string;
}

export interface RecipeOfferResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  data: RecipeOffer[];
}

export interface VaultOfferIncentiveToken {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  tokenAmountPerYear: number;
}

export interface VaultOffer {
  id: string;
  rawMarketRefId: string;
  chainId: number;
  marketType: number;
  marketId: string;
  offerSide: number;
  offerId: string;
  accountAddress: string;
  fundingVault: string;
  inputToken: BaseEnrichedTokenDataWithRemainingAmounts;
  incentiveTokens: VaultOfferIncentiveToken[];
  expiry: string;
  status: "invalid" | "active" | "cancelled" | "expired" | "filled";
  transactionHash: string;
}

export interface VaultOfferResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  data: VaultOffer[];
}

export interface GenericIncentive {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  rawAmount?: string;
  tokenAmount?: number;
  tokenAmountUsd?: number;
  yieldText?: string;
  yieldRate: number;
}

export interface MarketInputTokenDetailed {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Total Fillable Amount for AP
   * Total fillable token amount for AP
   * @example 1000
   */
  totalFillableForAP?: number;
  /**
   * Total Fillable Amount for IP
   * Total fillable token amount for IP
   * @example 1000
   */
  totalFillableForIP?: number;
}

export interface MarketActiveIncentiveDetailed {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Remaining Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  remainingRawAmount: string;
  /**
   * Remaining Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  remainingTokenAmount: number;
  /**
   * Remaining Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  remainingTokenAmountUsd: number;
  /**
   * Per Input Token
   * The ratio of incentive token to input token
   */
  perInputToken: number;
  /**
   * Annual Token Rate
   * The annual rate of the incentive token
   */
  annualTokenRate: number;
  /**
   * Incentive Start Timestamp
   * The start timestamp for the incentive token. Note: this is only applicable to vault markets.
   */
  startTimestamp?: string;
  /**
   * Incentive End Timestamp
   * The end timestamp for the incentive token. Note: this is only applicable to vault markets.
   */
  endTimestamp?: string;
}

export interface MarketUnderlyingIncentive {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  /**
   * Incentive Label
   * The custom label for the incentive token
   */
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
}

export interface MarketNativeIncentive {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  /**
   * Incentive Label
   * The custom label for the incentive token
   */
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
}

export interface MarketExternalIncentive {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  /**
   * Incentive Label
   * The custom label for the incentive token
   */
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Yield Text
   * Yield rate in string format to represent any arbitrary yields
   */
  yieldText: string;
}

export interface MarketRecipeData {
  /**
   * Recipe Commands Array
   * The weiroll commands for the recipe
   */
  commands: string[];
  /**
   * Recipe State Array
   * The weiroll state for the recipe
   */
  state: string[];
}

export interface MarketRecipeMetadata {
  /**
   * Deposit Recipe
   * The deposit recipe for the market
   */
  depositRecipe: MarketRecipeData;
  /**
   * Withdraw Recipe
   * The withdraw recipe for the market
   */
  withdrawRecipe: MarketRecipeData;
}

export interface MarketVaultBaseIncentiveTokenData {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Incentive Start Timestamp
   * The start timestamp for the incentive token. Note: this is only applicable to vault markets.
   */
  startTimestamp: string;
  /**
   * Incentive End Timestamp
   * The end timestamp for the incentive token. Note: this is only applicable to vault markets.
   */
  endTimestamp: string;
  /**
   * Incentive Raw Amount Rate
   * The rate of incentive token distribution in wei per second. Note: this is only applicable to vault markets.
   */
  rawAmountRate: string;
}

export interface MarketVaultMetadata {
  /**
   * Base Incentives
   * The base incentives for the market. Note: this is only applicable to vault markets.
   */
  baseIncentives: MarketVaultBaseIncentiveTokenData[];
}

export interface MarketMetadataSonicInfo {
  description: string;
  url?: string;
}

export interface MarketMetadataSonic {
  id: string;
  appType?: string;
  info?: MarketMetadataSonicInfo;
}

export interface MarketMetadataBoyco {
  id: string;
  multiplier: number;
  assetType: string;
}

export interface BaseEnrichedTokenData {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
}

export interface MarketMetadata {
  sonic?: MarketMetadataSonic;
  boyco?: MarketMetadataBoyco;
  minDepositToken?: BaseEnrichedTokenData;
}

export interface EnrichedMarket {
  /**
   * ID
   * The global unique identifier of the market: chainId_marketType_marketId
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Description
   * Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then stake the GHO for stkGHO and lock for 1 month.
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  description: string;
  /**
   * Category
   * The category of the market
   * @example "default"
   */
  category: string;
  /**
   * Underlying Vault Address
   * The address of the underlying vault -- only vault markets have an underlying vault, while recipe markets don't
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  underlyingVaultAddress?: string;
  /**
   * Lockup Time
   * The lockup time for the market in seconds. Note: vault markets always have a lockup time of "0"
   * @example "31536000"
   */
  lockupTime: string;
  /**
   * Frontend Fee
   * The frontend fee for the market in basis points in wei: 10^18 = 100%
   * @example "10000000000000000"
   */
  frontendFee: string;
  /**
   * Reward Style
   * The reward distribution style for the market: 0 = Upfront, 1 = Arrear, 2 = Forfeitable
   * @example 0
   */
  rewardStyle: 0 | 1 | 2;
  /**
   * TVL USD
   * The total value locked in the market in USD
   * @example 1456234.98
   */
  tvlUsd: number;
  /**
   * Fillable USD
   * The fillable USD for the market
   * @example 1456234.98
   */
  fillableUsd: number;
  /**
   * Capacity Ratio
   * The remaining capacity ratio for the market
   * @example 0.5
   */
  capacityRatio: number;
  /**
   * Incentives USD
   * The total value of incentives in the market in USD
   * @example 15689.23
   */
  incentivesUsd: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Variable Yield Rate
   * Variable yield rate from the market which will change based on deposits
   * @example 0.1
   */
  variableYieldRate: number;
  realYieldRate: number;
  tokenYieldRate: number;
  pointYieldRate: number;
  realIncentives: GenericIncentive[];
  tokenIncentives: GenericIncentive[];
  pointIncentives: GenericIncentive[];
  /**
   * Input Token ID
   * The ID of the input token for the market
   */
  inputTokenId: string;
  /**
   * Incentive Token IDs
   * The IDs of the incentive tokens for the market
   */
  incentiveTokenIds: string[];
  /**
   * Input Token Data
   * Token data for the market input token
   */
  inputToken: MarketInputTokenDetailed;
  /**
   * Incentive Tokens
   * Incentive tokens
   */
  incentiveTokens: TokenQuote[];
  /**
   * Active Incentives
   * Active incentive tokens
   */
  activeIncentives: MarketActiveIncentiveDetailed[];
  /**
   * Underlying Incentives
   * Underlying incentive tokens
   */
  underlyingIncentives?: MarketUnderlyingIncentive[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives?: MarketNativeIncentive[];
  /**
   * External Incentives
   * External incentive tokens
   */
  externalIncentives?: MarketExternalIncentive[];
  /**
   * Recipe Metadata
   * The metadata for the recipe
   */
  recipeMetadata?: MarketRecipeMetadata;
  /**
   * Vault Metadata
   * The metadata for the vault
   */
  vaultMetadata?: MarketVaultMetadata;
  /**
   * Market Metadata
   * The metadata for the market
   */
  marketMetadata?: MarketMetadata;
  /**
   * Is Verified
   * Whether the market is verified
   */
  isVerified: boolean;
  /**
   * Is Active
   * Whether the market is active
   */
  isActive: boolean;
  /**
   * Block Number
   * Block number associated with the entity
   * @example "21910786"
   */
  blockNumber: string;
  /**
   * Block Timestamp
   * Block timestamp associated with the entity
   * @example "1743357424"
   */
  blockTimestamp: string;
  /**
   * Transaction Hash
   * Transaction hash associated with the entity
   * @example "0xbd48c4956ca72ebca29e517f556676170f78914b786518854c3c57be933af461"
   */
  transactionHash: string;
  /**
   * Log Index
   * Log index associated with the entity
   * @example "12"
   */
  logIndex: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
}

export interface LabelledTokenQuote {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  /**
   * Label
   * The label of the token
   */
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
}

export interface CampaignMetadata {
  campaignId: string;
  protocol: string;
  poolId: string;
  startTime: string;
  endTime: string;
  status: string;
  depositLink: string;
  rewardAddress?: string;
  rewardPerHour?: string;
  incentiveLocker?: string;
  lastRewardAttestationTime?: string;
}

export interface EnrichedMarketV2 {
  /**
   * ID
   * The global unique identifier of the market: chainId_marketType_marketId
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Description
   * Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then stake the GHO for stkGHO and lock for 1 month.
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  description: string;
  /**
   * Category
   * The category of the market
   * @example "default"
   */
  category: string;
  /**
   * TVL USD
   * The total value locked in the market in USD
   * @example 1456234.98
   */
  tvlUsd: number;
  /**
   * Incentives USD
   * The total value of incentives in the market in USD
   * @example 15689.23
   */
  incentivesUsd: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Variable Yield Rate
   * Variable yield rate from the market which will change based on deposits
   * @example 0.1
   */
  variableYieldRate: number;
  tokenYieldRate: number;
  pointYieldRate: number;
  /**
   * Real incentives
   * @default []
   */
  realIncentives: GenericIncentive[];
  /**
   * Token incentives
   * @default []
   */
  tokenIncentives: GenericIncentive[];
  /**
   * Point incentives
   * @default []
   */
  pointIncentives: GenericIncentive[];
  /**
   * Active incentives
   * @default []
   */
  activeIncentives: MarketActiveIncentiveDetailed[];
  /**
   * Native incentives
   * @default []
   */
  nativeIncentives: MarketNativeIncentive[];
  /**
   * External incentives
   * @default []
   */
  externalIncentives: MarketExternalIncentive[];
  /**
   * Underlying incentives
   * @default []
   */
  underlyingIncentives: MarketUnderlyingIncentive[];
  /**
   * Input token IDs
   * @example ["0x123...","0x456..."]
   */
  inputTokenIds: string[];
  /**
   * Incentive token IDs
   * @example ["0xabc...","0xdef..."]
   */
  incentiveTokenIds: string[];
  /**
   * Input tokens
   * @default []
   */
  inputTokens: TokenQuote[];
  /**
   * Incentive tokens
   * @default []
   */
  incentiveTokens: LabelledTokenQuote[];
  /** Recipe metadata */
  recipeMetadata?: MarketRecipeMetadata;
  /** Vault metadata */
  vaultMetadata?: MarketVaultMetadata;
  /** Campaign metadata */
  campaignMetadata?: CampaignMetadata;
  /** Market metadata */
  marketMetadata?: MarketMetadata;
  /**
   * Is verified
   * @example false
   */
  isVerified: boolean;
  /**
   * Is active
   * @example true
   */
  isActive: boolean;
  /**
   * Block number
   * @example "12345678"
   */
  blockNumber: string;
  /**
   * Block timestamp
   * @example "1678901234"
   */
  blockTimestamp: string;
  /**
   * Transaction hash
   * @example "0x123..."
   */
  transactionHash: string;
  /**
   * Log index
   * @example "0"
   */
  logIndex: string;
  /** Search index */
  searchIndex?: string;
  /**
   * Last updated timestamp
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
}

export interface InfoMarketBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface EnrichedMarketMerged {
  /**
   * ID
   * The global unique identifier of the market: chainId_marketType_marketId
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Description
   * Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then stake the GHO for stkGHO and lock for 1 month.
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  description: string;
  /**
   * Category
   * The category of the market
   * @example "default"
   */
  category: string;
  /**
   * Underlying Vault Address
   * The address of the underlying vault -- only vault markets have an underlying vault, while recipe markets don't
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  underlyingVaultAddress?: string;
  /**
   * Lockup Time
   * The lockup time for the market in seconds. Note: vault markets always have a lockup time of "0"
   * @example "31536000"
   */
  lockupTime: string;
  /**
   * Frontend Fee
   * The frontend fee for the market in basis points in wei: 10^18 = 100%
   * @example "10000000000000000"
   */
  frontendFee: string;
  /**
   * Reward Style
   * The reward distribution style for the market: 0 = Upfront, 1 = Arrear, 2 = Forfeitable
   * @example 0
   */
  rewardStyle: 0 | 1 | 2;
  /**
   * TVL USD
   * The total value locked in the market in USD
   * @example 1456234.98
   */
  tvlUsd: number;
  /**
   * Fillable USD
   * The fillable USD for the market
   * @example 1456234.98
   */
  fillableUsd: number;
  /**
   * Capacity Ratio
   * The remaining capacity ratio for the market
   * @example 0.5
   */
  capacityRatio: number;
  /**
   * Incentives USD
   * The total value of incentives in the market in USD
   * @example 15689.23
   */
  incentivesUsd: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Variable Yield Rate
   * Variable yield rate from the market which will change based on deposits
   * @example 0.1
   */
  variableYieldRate: number;
  realYieldRate: number;
  tokenYieldRate: number;
  pointYieldRate: number;
  realIncentives: GenericIncentive[];
  tokenIncentives: GenericIncentive[];
  pointIncentives: GenericIncentive[];
  /**
   * Input Token ID
   * The ID of the input token for the market
   */
  inputTokenId: string;
  /**
   * Incentive Token IDs
   * The IDs of the incentive tokens for the market
   */
  incentiveTokenIds: string[];
  /**
   * Input Token Data
   * Token data for the market input token
   */
  inputToken: MarketInputTokenDetailed;
  /**
   * Incentive Tokens
   * Incentive tokens
   */
  incentiveTokens: TokenQuote[];
  /**
   * Active Incentives
   * Active incentive tokens
   */
  activeIncentives: MarketActiveIncentiveDetailed[];
  /**
   * Underlying Incentives
   * Underlying incentive tokens
   */
  underlyingIncentives?: MarketUnderlyingIncentive[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives?: MarketNativeIncentive[];
  /**
   * External Incentives
   * External incentive tokens
   */
  externalIncentives?: MarketExternalIncentive[];
  /**
   * Recipe Metadata
   * The metadata for the recipe
   */
  recipeMetadata?: MarketRecipeMetadata;
  /**
   * Vault Metadata
   * The metadata for the vault
   */
  vaultMetadata?: MarketVaultMetadata;
  /**
   * Market Metadata
   * The metadata for the market
   */
  marketMetadata?: MarketMetadata;
  /**
   * Is Verified
   * Whether the market is verified
   */
  isVerified: boolean;
  /**
   * Is Active
   * Whether the market is active
   */
  isActive: boolean;
  /**
   * Block Number
   * Block number associated with the entity
   * @example "21910786"
   */
  blockNumber: string;
  /**
   * Block Timestamp
   * Block timestamp associated with the entity
   * @example "1743357424"
   */
  blockTimestamp: string;
  /**
   * Transaction Hash
   * Transaction hash associated with the entity
   * @example "0xbd48c4956ca72ebca29e517f556676170f78914b786518854c3c57be933af461"
   */
  transactionHash: string;
  /**
   * Log Index
   * Log index associated with the entity
   * @example "12"
   */
  logIndex: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Input token IDs
   * @example ["0x123...","0x456..."]
   */
  inputTokenIds: string[];
  /**
   * Input tokens
   * @default []
   */
  inputTokens: MarketInputTokenDetailed[];
  /** Campaign metadata */
  campaignMetadata?: CampaignMetadata;
}

export interface ExploreMarketBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface ExploreMarketResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  data: EnrichedMarket[];
}

export interface ExploreSettingsMarketBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface TokenQuoteWithIds {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Token IDs
   * Array of token IDs
   * @example ["1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"]
   */
  ids: string[];
}

export interface ExploreSettingsMarketResponse {
  /**
   * Token Quote with IDs
   * Token quote with the IDs across chains
   * @example [{"id":"1-0xdac17f958d2ee523a2206206994597c13d831ec7","chainId":1,"contractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7","name":"Tether USDt","symbol":"USDT","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png","decimals":6,"source":"coinmarketcap","searchId":"825","owner":null,"issuers":null,"type":"token","price":1.0003895101587008,"fdv":148587729192.58,"totalSupply":148529875297.27908,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xdac17f958d2ee523a2206206994597c13d831ec7","42161-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9","98865-0x2086f755a6d9254045c257ea3d382ef854849b0f","11155111-0xb4d9f4171e501369fbd53774760bfd32fcdaafde","11155111-0xdacf10f85027e8d9c870ba60161ddefaf1a069b0"]},{"id":"1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","chainId":1,"contractAddress":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","name":"USDC","symbol":"USDC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png","decimals":6,"source":"coinmarketcap","searchId":"3408","owner":null,"issuers":null,"type":"token","price":0.9999050759315699,"fdv":61893388269.7,"totalSupply":61899263999.675934,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","8453-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913","42161-0xaf88d065e77c8cc2239327c5edb3a432268e5831","98865-0x28e0f0eed8d6a6a96033feee8b2d7f32eb5ccc48","98866-0x54fd4da2fa19cf0f63d8f93a6ea5bed3f9c042c6","11155111-0x3f85506f500cb02d141bafe467cc52ad5a9d7d5a","11155111-0x5839b25b55380bc3c701b2c808331e34e92161fe"]},{"id":"1-0x004375dff511095cc5a197a54140a24efef3a416","chainId":1,"contractAddress":"0x004375dff511095cc5a197a54140a24efef3a416","name":"Wrapped Bitcoin-USDC LP Token","symbol":"WBTC-USDC","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0x004375dff511095cc5a197a54140a24efef3a416","owner":null,"issuers":null,"type":"lp","price":111990158886727.7,"fdv":134201.52692311292,"totalSupply":1.198333213e-9,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x004375dff511095cc5a197a54140a24efef3a416"]},{"id":"1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","chainId":1,"contractAddress":"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","name":"Wrapped Bitcoin","symbol":"WBTC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png","decimals":8,"source":"coinmarketcap","searchId":"3717","owner":null,"issuers":null,"type":"token","price":93689.98760408539,"fdv":12083882133.07,"totalSupply":128977.30528189,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","42161-0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f","80094-0x0555e30da8f98308edb960aa94c0db47230d2b9c","11155111-0x29f2d40b0605204364af54ec677bd022da425d03"]},{"id":"1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","chainId":1,"contractAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","name":"WETH","symbol":"WETH","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png","decimals":18,"source":"coinmarketcap","searchId":"2396","owner":null,"issuers":null,"type":"token","price":1800.4005266139786,"fdv":6076923571.29,"totalSupply":3375317.5926469,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","146-0x50c42deacd8fc9773493ed674b675be577f2634b","8453-0x4200000000000000000000000000000000000006","42161-0x82af49447d8a07e3bd95bd0d56f35241523fbab1","80094-0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590","98865-0x626613b473f7ef65747967017c11225436efaed7","11155111-0xfff9976782d46cc05630d1f6ebab18b2324d6b14","11155111-0x7b79995e5f793a07bc00c21412e50ecae098e7f9"]},{"id":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","chainId":1,"contractAddress":"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","name":"USDC-WETH LP Token","symbol":"USDC-WETH","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","owner":null,"issuers":null,"type":"lp","price":220559770.71418175,"fdv":19438593.97350934,"totalSupply":0.08813299864506734,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"]},{"id":"1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","chainId":1,"contractAddress":"0x4c9edd5852cd905f086c759e8383e09bff1e68b3","name":"Ethena USDe","symbol":"USDe","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/29470.png","decimals":18,"source":"coinmarketcap","searchId":"29470","owner":null,"issuers":null,"type":"token","price":0.9994835892465651,"fdv":4768280522.72,"totalSupply":4770744186.32031,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","80094-0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34"]}]
   */
  staticInputTokenFilters: TokenQuoteWithIds[];
  /**
   * Token Quote with IDs
   * Token quote with the IDs across chains
   * @example [{"id":"1-0xdac17f958d2ee523a2206206994597c13d831ec7","chainId":1,"contractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7","name":"Tether USDt","symbol":"USDT","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png","decimals":6,"source":"coinmarketcap","searchId":"825","owner":null,"issuers":null,"type":"token","price":1.0003895101587008,"fdv":148587729192.58,"totalSupply":148529875297.27908,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xdac17f958d2ee523a2206206994597c13d831ec7","42161-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9","98865-0x2086f755a6d9254045c257ea3d382ef854849b0f","11155111-0xb4d9f4171e501369fbd53774760bfd32fcdaafde","11155111-0xdacf10f85027e8d9c870ba60161ddefaf1a069b0"]},{"id":"1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","chainId":1,"contractAddress":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","name":"USDC","symbol":"USDC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png","decimals":6,"source":"coinmarketcap","searchId":"3408","owner":null,"issuers":null,"type":"token","price":0.9999050759315699,"fdv":61893388269.7,"totalSupply":61899263999.675934,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","8453-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913","42161-0xaf88d065e77c8cc2239327c5edb3a432268e5831","98865-0x28e0f0eed8d6a6a96033feee8b2d7f32eb5ccc48","98866-0x54fd4da2fa19cf0f63d8f93a6ea5bed3f9c042c6","11155111-0x3f85506f500cb02d141bafe467cc52ad5a9d7d5a","11155111-0x5839b25b55380bc3c701b2c808331e34e92161fe"]},{"id":"1-0x004375dff511095cc5a197a54140a24efef3a416","chainId":1,"contractAddress":"0x004375dff511095cc5a197a54140a24efef3a416","name":"Wrapped Bitcoin-USDC LP Token","symbol":"WBTC-USDC","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0x004375dff511095cc5a197a54140a24efef3a416","owner":null,"issuers":null,"type":"lp","price":111990158886727.7,"fdv":134201.52692311292,"totalSupply":1.198333213e-9,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x004375dff511095cc5a197a54140a24efef3a416"]},{"id":"1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","chainId":1,"contractAddress":"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","name":"Wrapped Bitcoin","symbol":"WBTC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png","decimals":8,"source":"coinmarketcap","searchId":"3717","owner":null,"issuers":null,"type":"token","price":93689.98760408539,"fdv":12083882133.07,"totalSupply":128977.30528189,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","42161-0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f","80094-0x0555e30da8f98308edb960aa94c0db47230d2b9c","11155111-0x29f2d40b0605204364af54ec677bd022da425d03"]},{"id":"1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","chainId":1,"contractAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","name":"WETH","symbol":"WETH","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png","decimals":18,"source":"coinmarketcap","searchId":"2396","owner":null,"issuers":null,"type":"token","price":1800.4005266139786,"fdv":6076923571.29,"totalSupply":3375317.5926469,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","146-0x50c42deacd8fc9773493ed674b675be577f2634b","8453-0x4200000000000000000000000000000000000006","42161-0x82af49447d8a07e3bd95bd0d56f35241523fbab1","80094-0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590","98865-0x626613b473f7ef65747967017c11225436efaed7","11155111-0xfff9976782d46cc05630d1f6ebab18b2324d6b14","11155111-0x7b79995e5f793a07bc00c21412e50ecae098e7f9"]},{"id":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","chainId":1,"contractAddress":"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","name":"USDC-WETH LP Token","symbol":"USDC-WETH","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","owner":null,"issuers":null,"type":"lp","price":220559770.71418175,"fdv":19438593.97350934,"totalSupply":0.08813299864506734,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"]},{"id":"1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","chainId":1,"contractAddress":"0x4c9edd5852cd905f086c759e8383e09bff1e68b3","name":"Ethena USDe","symbol":"USDe","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/29470.png","decimals":18,"source":"coinmarketcap","searchId":"29470","owner":null,"issuers":null,"type":"token","price":0.9994835892465651,"fdv":4768280522.72,"totalSupply":4770744186.32031,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","80094-0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34"]}]
   */
  dynamicInputTokenFilters: TokenQuoteWithIds[];
  /**
   * Token Quote with IDs
   * Token quote with the IDs across chains
   * @example [{"id":"1-0xdac17f958d2ee523a2206206994597c13d831ec7","chainId":1,"contractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7","name":"Tether USDt","symbol":"USDT","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png","decimals":6,"source":"coinmarketcap","searchId":"825","owner":null,"issuers":null,"type":"token","price":1.0003895101587008,"fdv":148587729192.58,"totalSupply":148529875297.27908,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xdac17f958d2ee523a2206206994597c13d831ec7","42161-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9","98865-0x2086f755a6d9254045c257ea3d382ef854849b0f","11155111-0xb4d9f4171e501369fbd53774760bfd32fcdaafde","11155111-0xdacf10f85027e8d9c870ba60161ddefaf1a069b0"]},{"id":"1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","chainId":1,"contractAddress":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","name":"USDC","symbol":"USDC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png","decimals":6,"source":"coinmarketcap","searchId":"3408","owner":null,"issuers":null,"type":"token","price":0.9999050759315699,"fdv":61893388269.7,"totalSupply":61899263999.675934,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","8453-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913","42161-0xaf88d065e77c8cc2239327c5edb3a432268e5831","98865-0x28e0f0eed8d6a6a96033feee8b2d7f32eb5ccc48","98866-0x54fd4da2fa19cf0f63d8f93a6ea5bed3f9c042c6","11155111-0x3f85506f500cb02d141bafe467cc52ad5a9d7d5a","11155111-0x5839b25b55380bc3c701b2c808331e34e92161fe"]},{"id":"1-0x004375dff511095cc5a197a54140a24efef3a416","chainId":1,"contractAddress":"0x004375dff511095cc5a197a54140a24efef3a416","name":"Wrapped Bitcoin-USDC LP Token","symbol":"WBTC-USDC","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0x004375dff511095cc5a197a54140a24efef3a416","owner":null,"issuers":null,"type":"lp","price":111990158886727.7,"fdv":134201.52692311292,"totalSupply":1.198333213e-9,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x004375dff511095cc5a197a54140a24efef3a416"]},{"id":"1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","chainId":1,"contractAddress":"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","name":"Wrapped Bitcoin","symbol":"WBTC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png","decimals":8,"source":"coinmarketcap","searchId":"3717","owner":null,"issuers":null,"type":"token","price":93689.98760408539,"fdv":12083882133.07,"totalSupply":128977.30528189,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","42161-0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f","80094-0x0555e30da8f98308edb960aa94c0db47230d2b9c","11155111-0x29f2d40b0605204364af54ec677bd022da425d03"]},{"id":"1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","chainId":1,"contractAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","name":"WETH","symbol":"WETH","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png","decimals":18,"source":"coinmarketcap","searchId":"2396","owner":null,"issuers":null,"type":"token","price":1800.4005266139786,"fdv":6076923571.29,"totalSupply":3375317.5926469,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","146-0x50c42deacd8fc9773493ed674b675be577f2634b","8453-0x4200000000000000000000000000000000000006","42161-0x82af49447d8a07e3bd95bd0d56f35241523fbab1","80094-0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590","98865-0x626613b473f7ef65747967017c11225436efaed7","11155111-0xfff9976782d46cc05630d1f6ebab18b2324d6b14","11155111-0x7b79995e5f793a07bc00c21412e50ecae098e7f9"]},{"id":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","chainId":1,"contractAddress":"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","name":"USDC-WETH LP Token","symbol":"USDC-WETH","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","owner":null,"issuers":null,"type":"lp","price":220559770.71418175,"fdv":19438593.97350934,"totalSupply":0.08813299864506734,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"]},{"id":"1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","chainId":1,"contractAddress":"0x4c9edd5852cd905f086c759e8383e09bff1e68b3","name":"Ethena USDe","symbol":"USDe","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/29470.png","decimals":18,"source":"coinmarketcap","searchId":"29470","owner":null,"issuers":null,"type":"token","price":0.9994835892465651,"fdv":4768280522.72,"totalSupply":4770744186.32031,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","80094-0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34"]}]
   */
  staticIncentiveTokenFilters: TokenQuoteWithIds[];
  /**
   * Token Quote with IDs
   * Token quote with the IDs across chains
   * @example [{"id":"1-0xdac17f958d2ee523a2206206994597c13d831ec7","chainId":1,"contractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7","name":"Tether USDt","symbol":"USDT","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png","decimals":6,"source":"coinmarketcap","searchId":"825","owner":null,"issuers":null,"type":"token","price":1.0003895101587008,"fdv":148587729192.58,"totalSupply":148529875297.27908,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xdac17f958d2ee523a2206206994597c13d831ec7","42161-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9","98865-0x2086f755a6d9254045c257ea3d382ef854849b0f","11155111-0xb4d9f4171e501369fbd53774760bfd32fcdaafde","11155111-0xdacf10f85027e8d9c870ba60161ddefaf1a069b0"]},{"id":"1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","chainId":1,"contractAddress":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","name":"USDC","symbol":"USDC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png","decimals":6,"source":"coinmarketcap","searchId":"3408","owner":null,"issuers":null,"type":"token","price":0.9999050759315699,"fdv":61893388269.7,"totalSupply":61899263999.675934,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","8453-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913","42161-0xaf88d065e77c8cc2239327c5edb3a432268e5831","98865-0x28e0f0eed8d6a6a96033feee8b2d7f32eb5ccc48","98866-0x54fd4da2fa19cf0f63d8f93a6ea5bed3f9c042c6","11155111-0x3f85506f500cb02d141bafe467cc52ad5a9d7d5a","11155111-0x5839b25b55380bc3c701b2c808331e34e92161fe"]},{"id":"1-0x004375dff511095cc5a197a54140a24efef3a416","chainId":1,"contractAddress":"0x004375dff511095cc5a197a54140a24efef3a416","name":"Wrapped Bitcoin-USDC LP Token","symbol":"WBTC-USDC","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0x004375dff511095cc5a197a54140a24efef3a416","owner":null,"issuers":null,"type":"lp","price":111990158886727.7,"fdv":134201.52692311292,"totalSupply":1.198333213e-9,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x004375dff511095cc5a197a54140a24efef3a416"]},{"id":"1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","chainId":1,"contractAddress":"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","name":"Wrapped Bitcoin","symbol":"WBTC","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png","decimals":8,"source":"coinmarketcap","searchId":"3717","owner":null,"issuers":null,"type":"token","price":93689.98760408539,"fdv":12083882133.07,"totalSupply":128977.30528189,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","42161-0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f","80094-0x0555e30da8f98308edb960aa94c0db47230d2b9c","11155111-0x29f2d40b0605204364af54ec677bd022da425d03"]},{"id":"1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","chainId":1,"contractAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","name":"WETH","symbol":"WETH","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png","decimals":18,"source":"coinmarketcap","searchId":"2396","owner":null,"issuers":null,"type":"token","price":1800.4005266139786,"fdv":6076923571.29,"totalSupply":3375317.5926469,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","146-0x50c42deacd8fc9773493ed674b675be577f2634b","8453-0x4200000000000000000000000000000000000006","42161-0x82af49447d8a07e3bd95bd0d56f35241523fbab1","80094-0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590","98865-0x626613b473f7ef65747967017c11225436efaed7","11155111-0xfff9976782d46cc05630d1f6ebab18b2324d6b14","11155111-0x7b79995e5f793a07bc00c21412e50ecae098e7f9"]},{"id":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","chainId":1,"contractAddress":"0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","name":"USDC-WETH LP Token","symbol":"USDC-WETH","image":"https://chainlist.org/unknown-logo.png","decimals":18,"source":"lp","searchId":"1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc","owner":null,"issuers":null,"type":"lp","price":220559770.71418175,"fdv":19438593.97350934,"totalSupply":0.08813299864506734,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"]},{"id":"1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","chainId":1,"contractAddress":"0x4c9edd5852cd905f086c759e8383e09bff1e68b3","name":"Ethena USDe","symbol":"USDe","image":"https://s2.coinmarketcap.com/static/img/coins/64x64/29470.png","decimals":18,"source":"coinmarketcap","searchId":"29470","owner":null,"issuers":null,"type":"token","price":0.9994835892465651,"fdv":4768280522.72,"totalSupply":4770744186.32031,"lastUpdated":"2025-04-23 23:37:00","ids":["1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3","80094-0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34"]}]
   */
  dynamicIncentiveTokenFilters: TokenQuoteWithIds[];
}

export interface CreateMarketBody {
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Description
   * Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then stake the GHO for stkGHO and lock for 1 month.
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  description: string;
  /**
   * Transaction Hash
   * Transaction hash associated with the entity
   * @example "0xbd48c4956ca72ebca29e517f556676170f78914b786518854c3c57be933af461"
   */
  txHash: string;
}

export interface EnrichedMarketUserData {
  /**
   * ID
   * The global unique identifier of the market: chainId_marketType_marketId
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Description
   * Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then stake the GHO for stkGHO and lock for 1 month.
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  description: string;
  /**
   * Is Verified
   * Whether the market is verified
   */
  isVerified: boolean;
  /**
   * Is Active
   * Whether the market is active
   */
  isActive: boolean;
  /**
   * Category
   * The category of the market
   * @example "default"
   */
  category: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  /**
   * Incentive Token IDs
   * The IDs of the incentive tokens for the market
   */
  incentiveTokenIds: string[];
}

export interface CreateMarketResponse {
  /**
   * Status
   * The status of the created market
   * @example true
   */
  status: boolean;
  /**
   * Data
   * The data for the market
   * @example {"id":"11155111_0_0xb7be8b6efee4c2d1fead07d98c3a4b3d3c85dff0d1800294c27782b550099fc4","chainId":11155111,"marketType":0,"marketId":"0xb7be8b6efee4c2d1fead07d98c3a4b3d3c85dff0d1800294c27782b550099fc4","name":"my amazing market","description":"some description","isVerified":false,"isActive":false,"category":"default","lastUpdated":"2025-04-23 18:25:20.816117","incentiveIds":[]}
   */
  data: EnrichedMarketUserData;
  /**
   * Message
   * The message for the created market
   * @example "success"
   */
  message: string;
}

export interface VaultInfoRequestBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface VaultCapacity {
  /**
   * Currently filled capacity in USD
   * The maximum amount of USD that can be filled in the vault
   * @example 20000000
   */
  currentUsd: number;
  /**
   * Ratio of capacity filled
   * The ratio of capacity filled in the vault
   * @example 0.5
   */
  ratio: number;
}

export interface VaultManager {
  /**
   * Manager ID
   * The ID of the manager
   * @example "veda"
   */
  id: string;
  /**
   * Manager Name
   * The name of the manager
   * @example "VEDA"
   */
  name: string;
  /**
   * Manager Symbol
   * The symbol of the manager
   * @example "VEDA"
   */
  symbol: string;
  /**
   * Manager Image
   * The image of the manager
   * @example "https://pbs.twimg.com/profile_images/1790405638847135744/mx3dr412_400x400.png"
   */
  image?: string;
  /**
   * Manager Link
   * The link of the manager
   * @example "https://veda.tech/"
   */
  link?: string;
}

export interface VaultDepositToken {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
}

export interface VaultIncentiveToken {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  /**
   * Label
   * The label of the reward token
   * @example "Staked GHO Points"
   */
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Incentive ID
   * The ID of the incentive
   */
  incentiveId: string;
  /**
   * Category
   * The category of the reward token
   * @example "active"
   */
  category: "active" | "underlying" | "native" | "external";
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount?: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount?: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd?: number;
  /**
   * Per Deposit Token
   * The amount of incentive token per deposit token
   * @example 0.01
   */
  perDepositToken?: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate?: number;
  /**
   * Yield Text
   * Yield rate in string format to represent any arbitrary yields
   */
  yieldText?: string;
  /**
   * Scale Ratio
   * The ratio to scale by for the incentive token to get user's rate
   */
  scaleRatio: number;
  /**
   * Unlock Timestamp
   * The timestamp when the incentive token is unlocked
   */
  unlockTimestamp?: string;
}

export interface VaultAllocationDepositToken {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Allocation Ratio
   * The ratio of the input token to TVL of the vault
   * @example 1
   */
  allocationRatio: number;
}

export interface VaultAllocation {
  /**
   * Allocation ID
   * The ID of the allocation
   * @example "1_0_0x9a117f13c7d5d2b4b18e444f72e6e77c010a1fd90cf21135be75669d66ad9428"
   */
  id: string;
  /**
   * The type of the allocation
   * @example "active"
   */
  type: "active" | "passive" | "whitelisted";
  /**
   * Allocation Market Name
   * The name of the allocated market
   * @example "VEDA"
   */
  name: string;
  /**
   * Allocation Market Link
   * The link of the allocated market
   * @example "/market/1/0/0x9a117f13c7d5d2b4b18e444f72e6e77c010a1fd90cf21135be75669d66ad9428"
   */
  link?: string;
  /**
   * Deposit Token
   * The deposit token of the allocation
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  depositToken: VaultAllocationDepositToken;
  /**
   * Incentive Tokens
   * The incentive tokens of the allocation
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  incentiveTokens: VaultIncentiveToken[];
  /**
   * Unlock Timestamp
   * The timestamp when the allocation is unlocked
   * @example "1714531200"
   */
  unlockTimestamp?: string;
  /**
   * Yield Rate
   * The yield rate of the allocation
   * @example 0.1
   */
  yieldRate: number;
}

export interface VaultInfoResponse {
  /**
   * ID
   * The global unique identifier of the vault: chainId_vaultAddress
   * @example "146_0x45088fb2ffebfdcf4dff7b7201bfa4cd2077c30e"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Vault Address
   * The address of the vault
   * @example "0x45088fb2ffebfdcf4dff7b7201bfa4cd2077c30e"
   */
  vaultAddress: string;
  /**
   * Vault Name
   * Roy Sonic USDC
   * @example "Roy Sonic USDC"
   */
  name: string;
  /**
   * Vault Description
   * The description of the vault
   * @example "Deposit assets to earn highest yields."
   */
  description: string;
  /**
   * Chain IDs
   * The chain IDs of the vault
   * @example [1,146]
   */
  chainIds: number[];
  /**
   * Capacity
   * The capacity of the vault
   * @example {"currentUsd":1000000,"maxUsd":20000000,"ratio":0.5}
   */
  capacity: VaultCapacity;
  /**
   * Max Lockup
   * The max lockup of the vault
   * @example "2592000"
   */
  maxLockup: string;
  /**
   * Managers
   * The managers of the vault
   * @example [{"id":"veda","name":"VEDA","symbol":"VEDA","image":"https://pbs.twimg.com/profile_images/1790405638847135744/mx3dr412_400x400.png","link":"https://veda.tech/"}]
   */
  managers: VaultManager[];
  sharePrice: string;
  /**
   * Deposit Token IDs
   * The deposit token IDs of the vault
   * @example ["146-0x29219dd400f2bf60e5a23d13be72b486d4038894"]
   */
  depositTokenIds: string[];
  /**
   * Incentive Token IDs
   * The incentive token IDs of the vault
   * @example ["146-0x29219dd400f2bf60e5a23d13be72b486d4038894"]
   */
  incentiveTokenIds: string[];
  /**
   * Deposit Tokens
   * The deposit tokens of the vault
   */
  depositTokens: VaultDepositToken[];
  /**
   * Incentive Tokens
   * The incentive tokens of the vault
   */
  incentiveTokens: VaultIncentiveToken[];
  /**
   * Allocations
   * The allocations of the vault
   */
  allocations: VaultAllocation[];
  /**
   * Is Verified
   * Whether the vault is verified
   */
  isVerified: boolean;
  /**
   * TVL USD
   * The TVL of the vault in USD
   */
  tvlUsd: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  searchIndex: string;
}

export interface ExploreVaultBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface EnrichedVault {
  /**
   * ID
   * The global unique identifier of the vault: chainId_vaultAddress
   * @example "146_0x45088fb2ffebfdcf4dff7b7201bfa4cd2077c30e"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Vault Address
   * The address of the vault
   * @example "0x45088fb2ffebfdcf4dff7b7201bfa4cd2077c30e"
   */
  vaultAddress: string;
  /**
   * Vault Name
   * Roy Sonic USDC
   * @example "Roy Sonic USDC"
   */
  name: string;
  /**
   * Vault Description
   * The description of the vault
   * @example "Deposit assets to earn highest yields."
   */
  description: string;
  /**
   * Chain IDs
   * The chain IDs of the vault
   * @example [1,146]
   */
  chainIds: number[];
  /**
   * Capacity
   * The capacity of the vault
   * @example {"currentUsd":1000000,"maxUsd":20000000,"ratio":0.5}
   */
  capacity: VaultCapacity;
  /**
   * Max Lockup
   * The max lockup of the vault
   * @example "2592000"
   */
  maxLockup: string;
  /**
   * Managers
   * The managers of the vault
   * @example [{"id":"veda","name":"VEDA","symbol":"VEDA","image":"https://pbs.twimg.com/profile_images/1790405638847135744/mx3dr412_400x400.png","link":"https://veda.tech/"}]
   */
  managers: VaultManager[];
  sharePrice: string;
  /**
   * Deposit Token IDs
   * The deposit token IDs of the vault
   * @example ["146-0x29219dd400f2bf60e5a23d13be72b486d4038894"]
   */
  depositTokenIds: string[];
  /**
   * Incentive Token IDs
   * The incentive token IDs of the vault
   * @example ["146-0x29219dd400f2bf60e5a23d13be72b486d4038894"]
   */
  incentiveTokenIds: string[];
  /**
   * Deposit Tokens
   * The deposit tokens of the vault
   */
  depositTokens: VaultDepositToken[];
  /**
   * Incentive Tokens
   * The incentive tokens of the vault
   */
  incentiveTokens: VaultIncentiveToken[];
  /**
   * Allocations
   * The allocations of the vault
   */
  allocations: VaultAllocation[];
  /**
   * Is Verified
   * Whether the vault is verified
   */
  isVerified: boolean;
  /**
   * TVL USD
   * The TVL of the vault in USD
   */
  tvlUsd: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  searchIndex: string;
}

export interface ExploreVaultResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  data: EnrichedVault[];
}

export interface GlobalPositionRequestBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface GlobalPositionIncentiveTokenClaimInfoRecipe {
  rawMarketRefId: string;
  name: string;
  weirollWallet: string;
}

export interface GlobalPositionIncentiveTokenClaimInfoVault {
  rawMarketRefId: string;
  name: string;
}

export interface GlobalPositionIncentiveTokenClaimInfoBoyco {
  rawVaultRefId: string;
  name: string;
  rewardIds: string[];
}

export interface GlobalPositionIncentiveTokenClaimInfoV2 {
  rawMarketRefId: string;
  cumulativeAmounts: string[];
  epoch: string;
  proof: string[];
  submissionChainId: string[];
  submissionContract: string;
  claimChainId: string;
  claimContract: string;
  incentiveLocker: string;
}

export interface GlobalPositionIncentiveTokenClaimInfo {
  recipe?: GlobalPositionIncentiveTokenClaimInfoRecipe;
  vault?: GlobalPositionIncentiveTokenClaimInfoVault;
  boyco?: GlobalPositionIncentiveTokenClaimInfoBoyco;
  v2?: GlobalPositionIncentiveTokenClaimInfoV2;
}

export interface BaseEnrichedTokenDataWithClaimInfo {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Is unlocked
   * Whether the incentive token is claimable right now
   */
  isUnlocked: boolean;
  /**
   * Unlock timestamp
   * Timestamp when the incentive token will be claimable
   */
  unlockTimestamp?: string;
  /**
   * Claim info
   * Claim info of the incentive token
   */
  claimInfo: GlobalPositionIncentiveTokenClaimInfo;
}

export interface Position {
  /**
   * ID
   * ID of the position
   */
  id: string;
  /**
   * Name
   * Name of Market/Vault
   */
  name: string;
  /**
   * Deposit token
   * Deposit token of Market/Vault and its corresponding amount
   */
  depositToken: BaseEnrichedTokenData;
  /**
   * Unlock timestamp
   * Timestamp when the input token will be withdrawable
   */
  unlockTimestamp?: string;
  /**
   * Yield rate
   * Yield rate of this position
   */
  yieldRate: number;
  /**
   * Is unlocked
   * Whether the position is unlocked
   */
  isUnlocked: boolean;
  /**
   * Market link
   * Link to the market
   */
  marketLink: string;
}

export interface GlobalPositionResponse {
  /**
   * Balance USD
   * Balance in USD
   */
  balanceUsd: number;
  /**
   * Deposit balance USD
   * Deposit balance in USD
   */
  depositBalanceUsd: number;
  /**
   * Incentive balance USD
   * Incentive balance in USD
   */
  incentiveBalanceUsd: number;
  /**
   * Incentive tokens
   * Incentive tokens that are claimable
   */
  incentiveTokens: BaseEnrichedTokenDataWithClaimInfo[];
  /**
   * Positions
   * Positions that are claimable
   */
  positions: Position[];
  /**
   * Unclaimed point tokens
   * Unclaimed point tokens that are claimable
   */
  unclaimedPointTokens: BaseEnrichedTokenDataWithClaimInfo[];
  /**
   * Claimed point tokens
   * Point tokens that have been claimed
   */
  claimedPointTokens: BaseEnrichedTokenData[];
}

export interface BaseEnrichedTokenDataWithWithdrawStatus {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Is Withdrawn
   * Whether the token has been withdrawn
   */
  isWithdrawn: boolean;
}

export interface MarketActiveIncentiveWithClaimStatus {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Is Claimed
   * Whether the incentive token has been claimed
   */
  isClaimed: boolean;
}

export interface RecipePosition {
  /**
   * ID
   * The global unique identifier of the position: chainId_marketType_marketId_weirollWalletAddress
   */
  id: string;
  /**
   * Raw Market Ref ID
   * The raw market reference ID
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  rawMarketRefId: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Weiroll Wallet Address
   * Address of the weiroll wallet for this position
   */
  weirollWallet: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Reward Style
   * The reward distribution style for the market: 0 = Upfront, 1 = Arrear, 2 = Forfeitable
   * @example 0
   */
  rewardStyle: 0 | 1 | 2;
  /**
   * Is Forfeited
   * Whether the position has been forfeited
   * @example false
   */
  isForfeited: boolean;
  /**
   * Unlock Timestamp
   * Block timestamp when the position will be unlocked
   */
  unlockTimestamp: string;
  /**
   * Is Unlocked
   * Whether the position is unlocked
   */
  isUnlocked: boolean;
  /**
   * Block Number
   * Block number associated with the entity
   * @example "21910786"
   */
  blockNumber: string;
  /**
   * Block Timestamp
   * Block timestamp associated with the entity
   * @example "1743357424"
   */
  blockTimestamp: string;
  /**
   * Transaction Hash
   * Transaction hash associated with the entity
   * @example "0xbd48c4956ca72ebca29e517f556676170f78914b786518854c3c57be933af461"
   */
  transactionHash: string;
  /**
   * Log Index
   * Log index associated with the entity
   * @example "12"
   */
  logIndex: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Lockup Time
   * The lockup time for the market in seconds. Note: vault markets always have a lockup time of "0"
   * @example "31536000"
   */
  lockupTime: string;
  /**
   * Input Token
   * The input token for the position with withdraw status
   */
  inputToken: BaseEnrichedTokenDataWithWithdrawStatus;
  /**
   * Incentive Tokens
   * The incentive tokens for the position with claim status
   */
  incentiveTokens: MarketActiveIncentiveWithClaimStatus[];
  /**
   * Underlying Incentives
   * Underlying incentive tokens
   */
  underlyingIncentives?: MarketUnderlyingIncentive[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives?: MarketNativeIncentive[];
  /**
   * External Incentives
   * External incentive tokens
   */
  externalIncentives?: MarketExternalIncentive[];
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
}

export interface RecipePositionResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  /**
   * Recipe positions
   * Recipe positions
   */
  data: RecipePosition[];
}

export interface SpecificRecipePositionRequest {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface LockedInputTokenSpecificRecipePosition {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Weiroll Wallet Address
   * Address of the weiroll wallet for this position
   */
  weirollWallet: string;
  /**
   * Unlock Timestamp
   * Block timestamp when the weiroll wallet will be unlocked
   */
  unlockTimestamp: string;
  /**
   * Is Unlocked
   * Whether the weiroll wallet is unlocked
   */
  isUnlocked: boolean;
  /**
   * Reward Style
   * The reward distribution style for the market: 0 = Upfront, 1 = Arrear, 2 = Forfeitable
   * @example 0
   */
  rewardStyle: 0 | 1 | 2;
}

export interface UnclaimedIncentiveTokenSpecificRecipePosition {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Weiroll Wallet Address
   * Address of the weiroll wallet for this position
   */
  weirollWallet: string;
  /**
   * Unlock Timestamp
   * Block timestamp when the weiroll wallet will be unlocked
   */
  unlockTimestamp: string;
  /**
   * Is Unlocked
   * Whether the weiroll wallet is unlocked
   */
  isUnlocked: boolean;
  /**
   * Reward Style
   * The reward distribution style for the market: 0 = Upfront, 1 = Arrear, 2 = Forfeitable
   * @example 0
   */
  rewardStyle: 0 | 1 | 2;
}

export interface ClaimedIncentiveTokenSpecificRecipePosition {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
}

export interface SpecificRecipePositionResponse {
  /**
   * ID
   * The global unique identifier of the position: chainId_marketType_marketId_weirollWalletAddress
   */
  id: string;
  /**
   * Raw Market Ref ID
   * The raw market reference ID
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  rawMarketRefId: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Input Token
   * The input token data for the position
   */
  inputToken: BaseEnrichedTokenData;
  /**
   * Incentive Tokens
   * The incentive tokens for the position
   */
  incentiveTokens: BaseEnrichedTokenData[];
  /**
   * Locked Input Token
   * The locked input token for the position
   */
  lockedInputToken: LockedInputTokenSpecificRecipePosition[];
  /**
   * Unclaimed Incentive Tokens
   * The unclaimed incentive tokens for the position
   */
  unclaimedIncentiveTokens: UnclaimedIncentiveTokenSpecificRecipePosition[];
  /**
   * Claimed Incentive Tokens
   * The claimed incentive tokens for the position
   */
  claimedIncentiveTokens: ClaimedIncentiveTokenSpecificRecipePosition[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives?: MarketNativeIncentive[];
  /**
   * External Incentives
   * External incentive tokens
   */
  externalIncentives?: MarketExternalIncentive[];
  /**
   * Balance USD
   * The balance of the entity in USD
   */
  balanceUsd: number;
}

export interface VaultPosition {
  /**
   * ID
   * The global unique identifier of the position: chainId_marketType_marketId_accountAddress
   */
  id: string;
  /**
   * Raw Market Ref ID
   * The raw market reference ID
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  rawMarketRefId: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Vault Shares
   * Raw amount of vault shares in wei
   * @example "1000000000000000000"
   */
  shares: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Input Token
   * The input token for the position with withdraw status
   */
  inputToken: BaseEnrichedTokenDataWithWithdrawStatus;
  /**
   * Incentive Tokens
   * The incentive tokens for the position with claim status
   */
  incentiveTokens: MarketActiveIncentiveWithClaimStatus[];
  /**
   * Claimed Incentive Tokens
   * Claimed incentive tokens
   */
  claimedIncentiveTokens: BaseEnrichedTokenData[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives?: MarketNativeIncentive[];
  /**
   * External Incentives
   * External incentive tokens
   */
  externalIncentives?: MarketExternalIncentive[];
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Block Number
   * Block number associated with the entity
   * @example "21910786"
   */
  blockNumber: string;
  /**
   * Block Timestamp
   * Block timestamp associated with the entity
   * @example "1743357424"
   */
  blockTimestamp: string;
  /**
   * Transaction Hash
   * Transaction hash associated with the entity
   * @example "0xbd48c4956ca72ebca29e517f556676170f78914b786518854c3c57be933af461"
   */
  transactionHash: string;
  /**
   * Log Index
   * Log index associated with the entity
   * @example "12"
   */
  logIndex: string;
  /**
   * Is Unlocked
   * Whether the position is unlocked
   */
  isUnlocked: boolean;
}

export interface VaultPositionResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  /**
   * Vault positions
   * Vault positions
   */
  data: VaultPosition[];
}

export interface SpecificVaultPositionRequest {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface LockedInputTokenSpecificVaultPosition {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Shares
   * Raw amount of vault shares in wei
   * @example "1000000000000000000"
   */
  shares: string;
}

export interface UnclaimedIncentiveTokenSpecificVaultPosition {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
}

export interface SpecificVaultPositionResponse {
  /**
   * ID
   * The global unique identifier of the position: chainId_marketType_marketId_accountAddress
   */
  id: string;
  /**
   * Raw Market Ref ID
   * The raw market reference ID
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  rawMarketRefId: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Vault Shares
   * Raw amount of vault shares in wei
   * @example "1000000000000000000"
   */
  shares: string;
  /**
   * Input Token
   * The input token for the position
   */
  inputToken: BaseEnrichedTokenData;
  /**
   * Incentive Tokens
   * The incentive tokens for the position
   */
  incentiveTokens: BaseEnrichedTokenData[];
  /**
   * Locked Input Token
   * The locked input token for the position
   */
  lockedInputToken: LockedInputTokenSpecificVaultPosition[];
  /**
   * Unclaimed Incentive Tokens
   * The unclaimed incentive tokens for the position
   */
  unclaimedIncentiveTokens: UnclaimedIncentiveTokenSpecificVaultPosition[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives?: MarketNativeIncentive[];
  /**
   * External Incentives
   * External incentive tokens
   */
  externalIncentives?: MarketExternalIncentive[];
  /**
   * Balance USD
   * The balance of the entity in USD
   */
  balanceUsd: number;
}

export interface BoycoReceiptTokenData {
  weirollWallet: string;
  /**
   * Breakdown
   * Breakdown of receipt tokens
   */
  breakdown: BaseEnrichedTokenData[];
  /**
   * Is Withdrawn
   * Whether the receipt tokens have been withdrawn
   */
  isWithdrawn: boolean;
  /**
   * Merkle Deposit Nonce
   * Merkle deposit nonce
   */
  merkleDepositNonce: string;
  /**
   * Amount Deposited
   * Amount deposited on source chain
   */
  amountDeposited: string;
  /**
   * Merkle Proof
   * Merkle proof to claim deposit
   */
  merkleProof: string[];
  /**
   * Is Unlocked
   * Is unlocked
   */
  isUnlocked: boolean;
}

export interface BoycoUnderlyingIncentive {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Incentive Link
   * Incentive link
   */
  incentiveLink?: string;
  /**
   * Is Unlocked
   * Is unlocked
   */
  isUnlocked: boolean;
}

export interface BoycoNativeIncentive {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Incentive Link
   * Incentive link
   */
  incentiveLink?: string;
  /**
   * Is Unlocked
   * Is unlocked
   */
  isUnlocked: boolean;
}

export interface BoycoPosition {
  /**
   * ID
   * The global unique identifier of the position: chainId_marketType_marketId_weirollWalletAddress
   */
  id: string;
  /**
   * Raw Market Ref ID
   * The raw market reference ID
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  rawMarketRefId: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Destination Chain ID
   * Network ID of the destination blockchain
   * @example 1
   */
  destinationChainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Weiroll Wallet Address
   * Address of the weiroll wallet for this position
   */
  weirollWallet: string;
  /**
   * Is Withdrawn
   * Whether the receipt tokens have been withdrawn
   */
  isWithdrawn: boolean;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Unlock Timestamp
   * Block timestamp when the position will be unlocked
   */
  unlockTimestamp: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  /**
   * Lockup Time
   * The lockup time for the market in seconds. Note: vault markets always have a lockup time of "0"
   * @example "31536000"
   */
  lockupTime: string;
  /**
   * Input Token
   * Input token data
   */
  inputToken: BaseEnrichedTokenData;
  /**
   * Receipt Tokens
   * Tokens received on the destination chain, includes dust as well
   */
  receiptTokens: BoycoReceiptTokenData;
  /**
   * Incentive Tokens
   * Incentive tokens
   */
  incentiveTokens: BaseEnrichedTokenData[];
  /**
   * Underlying Incentives
   * Underlying incentive tokens
   */
  underlyingIncentives: BoycoUnderlyingIncentive[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives: BoycoNativeIncentive[];
  /**
   * Dapp Link
   * Link to the Dapp
   */
  dappLink?: string;
  /**
   * Merkle Link
   * Link to the merkle tree to claim tokens
   */
  merkleLink?: string;
  /**
   * Deposit Transaction Hash
   * Transaction hash of the deposit on the source chain
   * @example "0x0782e8b770bcf64a25998c191d5f63fce7645fc537698cdad8eec8b8d5b7f786"
   */
  depositTransactionHash: string;
  /**
   * Bridge Transaction Hash
   * Transaction hash of the bridge on the source chain
   * @example "0x8f768aa09904ee4f8c8a114d54f9f772aefe29a28c336f111693e1a6a92bf771"
   */
  bridgeTransactionHash: string;
  /**
   * Process Transaction Hash
   * Transaction hash of the processed bridge on the destination chain
   * @example "0x6ca4e1f0c042c468b349c5674c6b6e2b330102b6bc064a74590e94659f39ae61"
   */
  processTransactionHash: string;
  /**
   * Execute Transaction Hash
   * Transaction hash of the execution into the Dapp on the destination chain
   * @example "0x50b709ed7d0f3b5d4693548cd76e40ed1cffc8314253927391f7a655244e0832"
   */
  executeTransactionHash: string;
  /**
   * Is Unlocked
   * Whether the position is unlocked
   */
  isUnlocked: boolean;
}

export interface BoycoPositionResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  /**
   * Boyco positions
   * Boyco positions
   */
  data: BoycoPosition[];
}

export interface SpecificBoycoPositionRequest {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface SpecificBoycoPositionResponse {
  /**
   * ID
   * The global unique identifier of the position: chainId_marketType_marketId_weirollWalletAddress
   */
  id: string;
  /**
   * Raw Market Ref ID
   * The raw market reference ID
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  rawMarketRefId: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Destination Chain ID
   * Network ID of the destination blockchain
   * @example 1
   */
  destinationChainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Input Token
   * Input token data
   */
  inputToken: BaseEnrichedTokenData;
  /**
   * Receipt Tokens Breakdown
   * Breakdown of the receipt tokens
   */
  receiptTokensBreakdown: BaseEnrichedTokenData[];
  /**
   * Specific Locked Input Token
   * Specific locked input token
   */
  lockedInputToken: BoycoReceiptTokenData[];
  /**
   * Incentive Tokens
   * Incentive tokens
   */
  incentiveTokens: BaseEnrichedTokenData[];
  /**
   * Underlying Incentives
   * Underlying incentive tokens
   */
  underlyingIncentives: BoycoUnderlyingIncentive[];
  /**
   * Native Incentives
   * Native incentive tokens
   */
  nativeIncentives: BoycoNativeIncentive[];
  /**
   * Balance USD
   * The balance of the entity in USD
   */
  balanceUsd: number;
  dappLink?: string;
  merkleLink?: string;
}

export interface VaultPositionUnclaimedRewardToken {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Reward IDs
   * The IDs of the reward tokens
   * @example ["1","2","3"]
   */
  rewardIds: string[];
}

export interface VaultPositionClaimedRewardToken {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Reward IDs
   * The IDs of the reward tokens
   * @example ["1","2","3"]
   */
  rewardIds: string[];
}

export interface BoringPosition {
  /**
   * ID
   * The global unique identifier of the position: chainId_vaultAddress_accountAddress
   */
  id: string;
  rawVaultRefId: string;
  name: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Vault Address
   * The address of the vault
   * @example "0x45088fb2ffebfdcf4dff7b7201bfa4cd2077c30e"
   */
  vaultAddress: string;
  shares: string;
  sharePrice: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  depositToken: BaseEnrichedTokenData;
  unclaimedIncentiveTokens: BaseEnrichedTokenData;
  claimedIncentiveTokens: BaseEnrichedTokenData;
  /**
   * Unclaimed Reward Tokens
   * The unclaimed reward tokens for the position
   */
  unclaimedRewardTokens: VaultPositionUnclaimedRewardToken[];
  /**
   * Claimed Reward Tokens
   * The claimed reward tokens for the position
   */
  claimedRewardTokens: VaultPositionClaimedRewardToken[];
  yieldRate: number;
  unlockTimestamp: string;
  isUnlocked: boolean;
  estimatedEarningTimestamp: string;
  estimatedWithdrawalTimestamp: string;
}

export interface BoringPositionResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  /**
   * Boring positions
   * Boring positions
   */
  data: BoringPosition[];
}

export interface SpecificBoringPositionRequest {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface SpecificBoringPositionResponse {
  /**
   * ID
   * The global unique identifier of the position: chainId_vaultAddress_accountAddress
   */
  id: string;
  rawVaultRefId: string;
  name: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Vault Address
   * The address of the vault
   * @example "0x45088fb2ffebfdcf4dff7b7201bfa4cd2077c30e"
   */
  vaultAddress: string;
  shares: string;
  sharePrice: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  depositToken: BaseEnrichedTokenData;
  unclaimedIncentiveTokens: BaseEnrichedTokenData;
  claimedIncentiveTokens: BaseEnrichedTokenData;
  /**
   * Unclaimed Reward Tokens
   * The unclaimed reward tokens for the position
   */
  unclaimedRewardTokens: VaultPositionUnclaimedRewardToken[];
  /**
   * Claimed Reward Tokens
   * The claimed reward tokens for the position
   */
  claimedRewardTokens: VaultPositionClaimedRewardToken[];
  yieldRate: number;
  unlockTimestamp: string;
  isUnlocked: boolean;
  estimatedEarningTimestamp: string;
  estimatedWithdrawalTimestamp: string;
}

export interface V2Position {
  /**
   * ID
   * The global unique identifier of the position: chainId_marketType_marketId_weirollWalletAddress
   */
  id: string;
  /**
   * Raw Market Ref ID
   * The raw market reference ID
   * @example "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  rawMarketRefId: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Unlock Timestamp
   * Block timestamp when the position will be unlocked
   */
  unlockTimestamp: string;
  /**
   * Is Unlocked
   * Whether the position is unlocked
   */
  isUnlocked: boolean;
  /**
   * Block Number
   * Block number associated with the entity
   * @example "21910786"
   */
  blockNumber: string;
  /**
   * Block Timestamp
   * Block timestamp associated with the entity
   * @example "1743357424"
   */
  blockTimestamp: string;
  /**
   * Name
   * The name of the market
   * @example "Swap USDC to stkGHO for 1 mo"
   */
  name: string;
  inputTokens: BaseEnrichedTokenDataWithWithdrawStatus[];
  unclaimedIncentiveTokens: BaseEnrichedTokenDataWithClaimInfo[];
  claimedIncentiveTokens: BaseEnrichedTokenData[];
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  type: string;
  campaignMetadata: CampaignMetadata;
}

export interface V2PositionResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  /**
   * V2 positions
   * V2 positions
   */
  data: V2Position[];
}

export interface ContractDataResponse {
  /**
   * ID
   * Unique identifier for the entity
   * @example "98866_0_0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Contract Name
   * Name of the contract
   */
  contractName: string | null;
  /**
   * ABI
   * ABI of the contract
   */
  abi: any;
  /**
   * Implementation ID
   * ID of the implementation contract
   */
  implementationId: string | null;
  /**
   * Proxy Type
   * Type of the proxy
   */
  proxyType:
    | "EIP 1167"
    | "EIP 1967 (Direct)"
    | "EIP 1967 (Beacon)"
    | "EIP 1822"
    | "EIP 897"
    | "OpenZeppelin"
    | "Safe"
    | "Comptroller"
    | null;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  /**
   * Source
   * Source of the contract
   */
  source: "sourcify" | "etherscan" | null;
  implementation?: ContractDataResponse | null;
}

export interface ContractResponse {
  /**
   * ID
   * Unique identifier for the entity
   * @example "98866_0_0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Contract Name
   * Name of the contract
   */
  contractName: string | null;
  /**
   * ABI
   * ABI of the contract
   */
  abi: any;
  /**
   * Implementation ID
   * ID of the implementation contract
   */
  implementationId: string | null;
  /**
   * Proxy Type
   * Type of the proxy
   */
  proxyType:
    | "EIP 1167"
    | "EIP 1967 (Direct)"
    | "EIP 1967 (Beacon)"
    | "EIP 1822"
    | "EIP 897"
    | "OpenZeppelin"
    | "Safe"
    | "Comptroller"
    | null;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  /**
   * Source
   * Source of the contract
   */
  source: "sourcify" | "etherscan" | null;
  implementation?: ContractDataResponse | null;
}

export interface ChartRequestBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface EnrichedOfferInputTokenData {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Remaining Raw Amount
   * Remaining raw amount of the offer
   * @example "100"
   */
  remainingRawAmount: string;
  /**
   * Remaining Token Amount
   * Remaining token amount of the offer
   * @example 100
   */
  remainingTokenAmount: number;
  /**
   * Remaining Token Amount USD
   * Remaining token amount in USD of the offer
   * @example 100
   */
  remainingTokenAmountUsd: number;
}

export interface EnrichedOfferRawMetadata {
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Balance USD
   * The balance of the entity in USD
   */
  balanceUsd: number;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Lockup Time
   * The lockup time for the market in seconds. Note: vault markets always have a lockup time of "0"
   * @example "31536000"
   */
  lockupTime: string;
}

export interface EnrichedOfferIncentiveTokenData {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: EnrichedOfferRawMetadata;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  /**
   * Remaining Raw Amount
   * Remaining raw amount of the offer
   * @example "100"
   */
  remainingRawAmount: string;
  /**
   * Remaining Token Amount
   * Remaining token amount of the offer
   * @example 100
   */
  remainingTokenAmount: number;
  /**
   * Remaining Token Amount USD
   * Remaining token amount in USD of the offer
   * @example 100
   */
  remainingTokenAmountUsd: number;
  /**
   * Per Input Token
   * Per input token of the offer
   */
  perInputToken: number;
  /**
   * Annual Token Rate
   * Annual token rate of the offer
   */
  annualTokenRate: number;
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
}

export interface EnrichedOffer {
  /**
   * ID
   * Unique identifier for the entity
   * @example "98866_0_0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Market Type
   * The type of market: 0 = Recipe, 1 = Vault
   * @example 0
   */
  marketType: 0 | 1 | 2;
  /**
   * Offer Side
   * Side of the offer (0: AP, 1: IP)
   * @example 0
   */
  offerSide: number;
  /**
   * Offer ID
   * ID of the offer
   * @example "0x123..."
   */
  offerId: string;
  /**
   * Market ID
   * The on-chain identifier of the market: For recipe market, it's market hash -- for vault market, it's wrapped vault address
   * @example "0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b"
   */
  marketId: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  /**
   * Funding Vault
   * Address of the funding vault
   * @example "0x123..."
   */
  fundingVault: string;
  /**
   * Expiry
   * Expiry timestamp of the offer
   * @example "0"
   */
  expiry: string;
  /**
   * Is Cancelled
   * Whether the offer is cancelled
   * @example false
   */
  isCancelled: boolean;
  /**
   * Is Valid
   * Whether the offer is valid
   * @example true
   */
  isValid: boolean;
  /**
   * Block Number
   * Block number associated with the entity
   * @example "21910786"
   */
  blockNumber: string;
  /**
   * Block Timestamp
   * Block timestamp associated with the entity
   * @example "1743357424"
   */
  blockTimestamp: string;
  /**
   * Transaction Hash
   * Transaction hash associated with the entity
   * @example "0xbd48c4956ca72ebca29e517f556676170f78914b786518854c3c57be933af461"
   */
  transactionHash: string;
  /**
   * Log Index
   * Log index associated with the entity
   * @example "12"
   */
  logIndex: string;
  inputTokenData: EnrichedOfferInputTokenData;
  incentiveTokensData: EnrichedOfferIncentiveTokenData[];
  /**
   * Yield Rate
   * Yield rate as a ratio: 0.1 = 10%, 1 = 100%, etc.
   * @example "0.1"
   */
  yieldRate: number;
  /**
   * Can Be Filled
   * Whether the offer can be filled
   * @example true
   */
  canBeFilled: boolean;
}

export interface ChartResponse {
  offers: EnrichedOffer[];
}

export interface RecipeAPMarketActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  quantity: string;
  accountAddress?: string;
  fundingVault?: string;
}

export interface V1ActionIncentiveToken {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  perInputToken: number;
  yieldRate: number;
}

export interface RawTxOption {
  id: string;
  chainId: number;
  contractId: string;
  category: string;
  label: string;
  address: string;
  functionName: string;
  args: any[];
  txStatus: string;
}

export interface RecipeAPMarketActionResponse {
  fillStatus: "invalid" | "empty" | "partial" | "full";
  inputToken: BaseEnrichedTokenData;
  rewardStyle: number;
  yieldRate: number;
  incentiveTokens: V1ActionIncentiveToken[];
  underlyingIncentives: MarketUnderlyingIncentive[];
  nativeIncentives: MarketNativeIncentive[];
  externalIncentives: MarketExternalIncentive[];
  rawTxOptions: RawTxOption[];
  totalFeeRatio: number;
}

export interface RecipeIPMarketActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  quantity: string;
  accountAddress?: string;
}

export interface RecipeIPMarketActionResponse {
  fillStatus: "invalid" | "empty" | "partial" | "full";
  inputToken: BaseEnrichedTokenData;
  rewardStyle: number;
  yieldRate: number;
  incentiveTokens: V1ActionIncentiveToken[];
  underlyingIncentives: MarketUnderlyingIncentive[];
  nativeIncentives: MarketNativeIncentive[];
  externalIncentives: MarketExternalIncentive[];
  rawTxOptions: RawTxOption[];
  totalFeeRatio: number;
}

export interface RecipeIPLimitActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  accountAddress?: string;
  quantity: string;
  tokenIds: string[];
  tokenAmounts: string[];
  expiry?: string;
}

export interface RecipeIPLimitActionResponse {
  fillStatus: "invalid" | "empty" | "partial" | "full";
  inputToken: BaseEnrichedTokenData;
  rewardStyle: number;
  yieldRate: number;
  incentiveTokens: V1ActionIncentiveToken[];
  underlyingIncentives: MarketUnderlyingIncentive[];
  nativeIncentives: MarketNativeIncentive[];
  externalIncentives: MarketExternalIncentive[];
  rawTxOptions: RawTxOption[];
  totalFeeRatio: number;
}

export interface RecipeAPLimitActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  accountAddress?: string;
  fundingVault?: string;
  quantity: string;
  tokenIds: string[];
  tokenAmounts: string[];
  expiry?: string;
}

export interface RecipeAPLimitActionResponse {
  fillStatus: "invalid" | "empty" | "partial" | "full";
  inputToken: BaseEnrichedTokenData;
  rewardStyle: number;
  yieldRate: number;
  incentiveTokens: V1ActionIncentiveToken[];
  underlyingIncentives: MarketUnderlyingIncentive[];
  nativeIncentives: MarketNativeIncentive[];
  externalIncentives: MarketExternalIncentive[];
  rawTxOptions: RawTxOption[];
  totalFeeRatio: number;
}

export interface VaultAPMarketActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  quantity: string;
  accountAddress?: string;
}

export interface VaultAPMarketActionResponse {
  inputToken: BaseEnrichedTokenData;
  yieldRate: number;
  incentiveTokens: BaseEnrichedTokenData[];
  nativeIncentives: MarketNativeIncentive[];
  externalIncentives: MarketExternalIncentive[];
  rawTxOptions: RawTxOption[];
}

export interface VaultAPLimitActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  quantity: string;
  accountAddress?: string;
  fundingVault?: string;
  tokenIds: string[];
  tokenRates: string[];
  expiry?: string;
}

export type VaultAPLimitActionResponse = object;

export interface VaultIPAddIncentivesActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  accountAddress?: string;
  tokenIds: string[];
  tokenAmounts: string[];
  startTimestamps: string[];
  endTimestamps: string[];
}

export interface IncentiveTokenVaultIPAddIncentives {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  rawAmountWithFees: string;
  tokenAmountWithFees: number;
  tokenAmountUsdWithFees: number;
}

export interface VaultIPAddIncentivesActionResponse {
  totalFeeRatio: number;
  incentiveTokens: IncentiveTokenVaultIPAddIncentives[];
  rawTxOptions: RawTxOption[];
}

export interface VaultIPExtendIncentivesActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  accountAddress?: string;
  tokenIds: string[];
  tokenAmounts: string[];
  endTimestamps: string[];
}

export interface IncentiveTokenVaultIPExtendIncentives {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
  rawAmountWithFees: string;
  tokenAmountWithFees: number;
  tokenAmountUsdWithFees: number;
}

export interface VaultIPExtendIncentivesActionResponse {
  totalFeeRatio: number;
  incentiveTokens: IncentiveTokenVaultIPExtendIncentives[];
  rawTxOptions: RawTxOption[];
}

export interface VaultIPRefundIncentivesActionBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  id: string;
  tokenIds: string[];
}

export interface IncentiveTokenVaultIPRefundIncentives {
  /**
   * Raw Metadata
   * Raw metadata
   */
  rawMetadata?: object;
  /**
   * Token ID
   * Unique identifier for the token: chainId-contractAddress
   * @example "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Name
   * The name of the token
   * @example "USDC"
   */
  name: string;
  label?: string;
  description?: string;
  /**
   * Symbol
   * The symbol of the token
   * @example "USDC"
   */
  symbol: string;
  /**
   * Image
   * The logo of the token
   * @example "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
   */
  image: string;
  /**
   * Decimals
   * The number of decimals of the token
   * @example 6
   */
  decimals: number;
  /**
   * Source
   * The source for the price feed of the token
   * @example "coinmarketcap"
   */
  source:
    | "coinmarketcap"
    | "coingecko"
    | "lp"
    | "enso"
    | "pendle"
    | "plume"
    | "external";
  /**
   * Search ID
   * The search id for the token on the source price feed: for CoinmarketCap, it's UCID (found under metadata section of the token page) -- for Coingecko, it's token slug (found in the URL of the token page) -- for all other sources, we have a custom search id according to their price feed API schema
   * @example "3408"
   */
  searchId: string;
  /**
   * Type
   * The type of the token
   * @example "token"
   */
  type: "token" | "point" | "lp";
  /**
   * Price
   * The price of the token
   * @example 0.99999999
   */
  price: number;
  /**
   * FDV
   * The fully diluted valuation of the token
   * @example 59689964490.12
   */
  fdv: number;
  /**
   * Total Supply
   * The total supply of the token
   * @example 59689963893.2
   */
  totalSupply: number;
  /**
   * Owner
   * The owner of the point program token
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  owner?: string;
  /**
   * Issuers
   * Authorized issuers of the point program token
   */
  issuers?: string[];
  /**
   * Sub Tokens
   * Array of sub tokens
   */
  subTokens?: TokenQuote[];
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
  /**
   * Search Index
   * Search index for the entity
   * @example "0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  searchIndex?: string;
  /**
   * Last Updated
   * The last updated timestamp of the data in YYYY-MM-DD HH:MM:SS format
   * @example "2025-03-17 17:52:10"
   */
  lastUpdated: string;
  tag?: string;
  /**
   * Raw Amount
   * Amount in wei
   * @example "10000000000"
   */
  rawAmount: string;
  /**
   * Token Amount
   * Normalized raw amount in token decimals
   * @example 1000
   */
  tokenAmount: number;
  /**
   * Token Amount USD
   * Normalized raw amount in USD
   * @example 999.99
   */
  tokenAmountUsd: number;
}

export interface VaultIPRefundIncentivesActionResponse {
  incentiveTokens: IncentiveTokenVaultIPRefundIncentives[];
  rawTxOptions: RawTxOption[];
}

export interface PointDirectoryRequestBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface PointDirectoryResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  /**
   * Point directory
   * Point directory
   */
  data: TokenQuote;
}

export interface SubscribeBoycoBody {
  email: string;
}

export interface SubscribeBoycoResponse {
  status: boolean;
}

export interface SimulateTransactionBody {
  /** Raw transactions to simulate */
  rawTxns: RawTxOption[];
}

export interface SimulatedTransaction {
  /** ID of the transaction */
  id: string;
  /** Tokens going in as part of this transaction */
  tokensIn: BaseEnrichedTokenData[];
  /** Tokens coming out as part of this transaction */
  tokensOut: BaseEnrichedTokenData[];
  /** Warning message if there are any issues with the simulation */
  warning?: string;
}

export interface SimulateTransactionResponse {
  /** Simulated transactions */
  simulatedTxns: SimulatedTransaction[];
}

export interface WalletInfo {
  id: string;
  balanceUsd: number;
}

export interface NonceResponse {
  /**
   * Nonce for SIWE message
   * @example "a1b2c3d4..."
   */
  nonce: string;
  /**
   * When the nonce was issued
   * @example "2024-03-20T12:00:00Z"
   */
  issuedAt: string;
  /**
   * When the nonce expires
   * @example "2024-03-20T12:05:00Z"
   */
  expiresAt: string;
  /**
   * Whether the user is already logged in
   * @example false
   */
  isAlreadyLoggedIn?: boolean;
  /** Session signature */
  signature: string;
  /** Wallet info */
  walletInfo: WalletInfo;
}

export interface LoginBody {
  /** SIWE message to verify */
  message: string;
  /**
   * Signature of the SIWE message
   * @example "0x1234...5678"
   */
  signature: string;
  /**
   * Whether to link the wallet to the existing user
   * @example true
   */
  linkWallet?: boolean;
}

export interface LoginResponse {
  /** Status of the login */
  status: boolean;
  /** Signature of the session */
  signature: string;
  /** Wallet info */
  walletInfo: WalletInfo;
}

export interface LogoutBody {
  /**
   * Wallet address to unlink
   * @example "0x1234...5678"
   */
  unlinkWalletAddress?: string;
}

export interface LogoutResponse {
  /** Status of the logout */
  status: boolean;
}

export interface RevalidateSessionResponse {
  /** Status of the revalidation */
  status: boolean;
  /** Session signature */
  signature: string;
  /** Wallet info */
  walletInfo: WalletInfo;
}

export interface ActivityBody {
  /**
   * Filters Array
   * Array of filter objects to apply to the results
   * @example [{"id":"chainId","value":1},{"id":"tvlUsd","value":1000000,"condition":"gte"}]
   */
  filters?: Filter[];
  /**
   * Search Key
   * Key to search by
   * @example "marketId"
   */
  searchKey?: string;
  /**
   * Sorting Object
   * Object type to sort results with
   * @example [{"id":"tvlUsd","desc":true}]
   */
  sorting?: Sorting[];
  /**
   * Request Page Object
   * Object type to request a page of results
   * @default {"index":1,"size":10}
   * @example {"index":1,"size":3}
   */
  page?: RequestPage;
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface SourceInfo {
  /**
   * Source Name
   * Name of the source
   */
  name: string;
}

export interface EnrichedActivity {
  blockRange: string;
  /**
   * ID
   * Unique identifier for the entity
   * @example "98866_0_0x6e1fcdd01bec1ac68a1a510408c844702c5793ffaf6f3117f7c42a9c555bc13d"
   */
  id: string;
  /**
   * Chain ID
   * Network ID of the blockchain
   * @example 1
   */
  chainId: number;
  category: ActivityCategory;
  subCategory: ActivitySubCategory;
  /**
   * Contract Address
   * Deployment address of the contract
   * @example "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
   */
  contractAddress: string;
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
  tokenIndex: number;
  tokenAmount: number;
  blockTimestamp: number;
  transactionHash: string;
  logIndex: number;
  /**
   * Activity Token
   * Token data for the activity
   */
  activityToken: BaseEnrichedTokenData;
  /**
   * Activity Source
   * Source info for the activity
   */
  sourceInfo: SourceInfo;
}

export interface ActivityResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  data: EnrichedActivity[];
}

export interface UserInfo {
  id: string;
  name: string;
  description?: string;
  pfpUrl?: string;
  email: string;
  subscribed: boolean;
  verified: boolean;
  wallets: WalletInfo[];
  hasRoyaltyAccess: boolean;
}

export interface EditUserBody {
  /**
   * @minLength 1
   * @maxLength 50
   */
  name?: string;
  email?: string;
  /**
   * @minLength 1
   * @maxLength 1000
   */
  description?: string;
  subscribed?: boolean;
  deleteEmail?: boolean;
  deleteWallet?: string;
}

export interface EditUserResponse {
  status: boolean;
}

export interface VerifyUserEmailResponse {
  id: string;
}

export interface GetUserBalanceBody {
  /**
   * Account Address
   * Wallet address of the account
   * @example "0x77777cc68b333a2256b436d675e8d257699aa667"
   */
  accountAddress: string;
}

export interface GetUserBalanceResponse {
  id: string;
  balanceUsd: number;
}

export interface UserLeaderboardInfo {
  rank: number;
  name: string;
  balanceUsd: number;
  duration: number;
}

export interface GetUserLeaderboardResponse {
  /**
   * Response Page Object
   * Object type to respond with a page of results
   * @example {"index":1,"size":3,"total":10}
   */
  page: ResponsePage;
  /**
   * Row Count
   * Total number of rows in the results
   * @example 234
   */
  count: number;
  data: UserLeaderboardInfo[];
}

export interface GetUserStatsResponse {
  balanceUsd: number;
  users: number;
}

export interface GetExpectedRankBody {
  balanceUsd: number;
}

export interface GetExpectedRankResponse {
  rank: number;
}

export interface RegisterUserBody {
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  email: string;
  signatures: string[];
}

export interface RegisterUserResponse {
  status: boolean;
}

export interface EnrichedUserSafeInfoBody {
  /**
   * Custom Token Data
   * Array of custom token assumptions --  if not provided, the default quote data will be used.
   */
  customTokenData?: CustomTokenDataElement[];
}

export interface EnrichedSafe {
  id: string;
  chainId: number;
  safeAddress: string;
  threshold: number;
  owners: string[];
}

export interface EnrichedUserSafeInfo {
  id: string;
  safes: EnrichedSafe[];
}

export interface HealthControllerCheckData {
  /** @example "ok" */
  status?: string;
  /** @example {"database":{"status":"up"}} */
  info?: Record<
    string,
    {
      status: string;
      [key: string]: any;
    }
  >;
  /** @example {} */
  error?: Record<
    string,
    {
      status: string;
      [key: string]: any;
    }
  >;
  /** @example {"database":{"status":"up"}} */
  details?: Record<
    string,
    {
      status: string;
      [key: string]: any;
    }
  >;
}

export type HealthControllerCheckError = {
  /** @example "error" */
  status?: string;
  /** @example {"database":{"status":"up"}} */
  info?: Record<
    string,
    {
      status: string;
      [key: string]: any;
    }
  >;
  /** @example {"redis":{"status":"down","message":"Could not connect"}} */
  error?: Record<
    string,
    {
      status: string;
      [key: string]: any;
    }
  >;
  /** @example {"database":{"status":"up"},"redis":{"status":"down","message":"Could not connect"}} */
  details?: Record<
    string,
    {
      status: string;
      [key: string]: any;
    }
  >;
};

export type TokenControllerGetTokenQuoteData = TokenQuoteResponse;

export type TokenControllerGetTokenDirectoryData = TokenDirectoryResponse;

export type OfferControllerGetRecipeOffersData = RecipeOfferResponse;

export type OfferControllerGetVaultOffersData = VaultOfferResponse;

export type AddonsControllerGetIncentivesData = any;

export type AddonsControllerRefreshIncentivesData = any;

export type MarketControllerGetMarketData = EnrichedMarketMerged;

export type MarketControllerGetMarketsData = ExploreMarketResponse;

export type MarketControllerGetMarketSettingsData =
  ExploreSettingsMarketResponse;

export type MarketControllerCreateMarketData = CreateMarketResponse;

export type VaultControllerGetVaultInfoData = VaultInfoResponse;

export type VaultControllerGetVaultsData = ExploreVaultResponse;

export type PositionControllerGetGlobalPositionsData = GlobalPositionResponse;

export type PositionControllerGetRecipePositionsData = RecipePositionResponse;

export type PositionControllerGetSpecificRecipePositionData =
  SpecificRecipePositionResponse;

export type PositionControllerGetVaultPositionsData = VaultPositionResponse;

export type PositionControllerGetSpecificVaultPositionData =
  SpecificVaultPositionResponse;

export type PositionControllerGetBoycoPositionsData = BoycoPositionResponse;

export type PositionControllerGetSpecificBoycoPositionData =
  SpecificBoycoPositionResponse;

export type PositionControllerGetBoringPositionsData = BoringPositionResponse;

export type PositionControllerGetSpecificBoringPositionData =
  SpecificBoringPositionResponse;

export type PositionControllerGetV2PositionsData = V2PositionResponse;

export type ContractControllerGetContractData = ContractResponse;

export type ChartControllerGetMarketChartData = ChartResponse;

export type ActionControllerRecipeApMarketActionData =
  RecipeAPMarketActionResponse;

export type ActionControllerRecipeIpMarketActionData =
  RecipeIPMarketActionResponse;

export type ActionControllerRecipeIpLimitActionData =
  RecipeIPLimitActionResponse;

export type ActionControllerRecipeApLimitActionData =
  RecipeAPLimitActionResponse;

export type ActionControllerVaultApMarketActionData =
  VaultAPMarketActionResponse;

export type ActionControllerVaultApLimitActionData = VaultAPLimitActionResponse;

export type ActionControllerVaultIpAddIncentivesActionData =
  VaultIPAddIncentivesActionResponse;

export type ActionControllerVaultIpExtendIncentivesActionData =
  VaultIPExtendIncentivesActionResponse;

export type ActionControllerVaultIpRefundIncentivesActionData =
  VaultIPRefundIncentivesActionResponse;

export type PointControllerGetPointDirectoryData = PointDirectoryResponse;

export type SubscribeControllerSubscribeBoycoData = SubscribeBoycoResponse;

export type SimulateControllerSimulateTransactionsData =
  SimulateTransactionResponse;

export type AuthControllerGetNonceData = NonceResponse;

export type AuthControllerLoginData = LoginResponse;

export type AuthControllerLogoutData = LogoutResponse;

export type AuthControllerRevalidateSessionData = RevalidateSessionResponse;

export type ActivityControllerGetActivitiesData = ActivityResponse;

export type UserControllerGetUserInfoData = UserInfo;

export type UserControllerEditUserData = EditUserResponse;

export type UserControllerVerifyUserEmailData = VerifyUserEmailResponse;

export type UserControllerGetUserBalanceData = GetUserBalanceResponse;

export type UserControllerGetUserLeaderboardData = GetUserLeaderboardResponse;

export type UserControllerGetUserStatsData = GetUserStatsResponse;

export type UserControllerGetExpectedRankData = GetExpectedRankResponse;

export type UserControllerRegisterUserData = RegisterUserResponse;

export type SafeControllerGetEnrichedUserSafeInfoData = EnrichedUserSafeInfo;

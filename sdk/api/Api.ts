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

import {
  ActionControllerRecipeApLimitActionData,
  ActionControllerRecipeApMarketActionData,
  ActionControllerRecipeIpLimitActionData,
  ActionControllerRecipeIpMarketActionData,
  ActionControllerVaultApLimitActionData,
  ActionControllerVaultApMarketActionData,
  ActionControllerVaultIpAddIncentivesActionData,
  ActionControllerVaultIpExtendIncentivesActionData,
  ActionControllerVaultIpRefundIncentivesActionData,
  ActivityBody,
  ActivityControllerGetActivitiesData,
  AddonsControllerGetIncentivesData,
  AddonsControllerRefreshIncentivesData,
  AuthControllerConfirmWalletLinkData,
  AuthControllerEditUserData,
  AuthControllerGetNonceData,
  AuthControllerGetSessionData,
  AuthControllerInitWalletLinkData,
  AuthControllerLoginData,
  AuthControllerLogoutData,
  BaseRequestBody,
  ChartControllerGetMarketChartData,
  ChartRequestBody,
  ContractControllerGetContractData,
  CreateMarketBody,
  EditUserBody,
  ExploreMarketBody,
  ExploreSettingsMarketBody,
  ExploreVaultBody,
  GetUserInfoBody,
  GlobalPositionRequestBody,
  HealthControllerCheckData,
  HealthControllerCheckError,
  InfoMarketBody,
  LoginBody,
  LogoutBody,
  MarketControllerCreateMarketData,
  MarketControllerGetMarketData,
  MarketControllerGetMarketsData,
  MarketControllerGetMarketSettingsData,
  OfferControllerGetRecipeOffersData,
  OfferControllerGetVaultOffersData,
  PointControllerGetPointDirectoryData,
  PointDirectoryRequestBody,
  PositionControllerGetBoringPositionsData,
  PositionControllerGetBoycoPositionsData,
  PositionControllerGetGlobalPositionsData,
  PositionControllerGetRecipePositionsData,
  PositionControllerGetSpecificBoringPositionData,
  PositionControllerGetSpecificBoycoPositionData,
  PositionControllerGetSpecificRecipePositionData,
  PositionControllerGetSpecificVaultPositionData,
  PositionControllerGetVaultPositionsData,
  RecipeAPLimitActionBody,
  RecipeAPMarketActionBody,
  RecipeIPLimitActionBody,
  RecipeIPMarketActionBody,
  SessionBody,
  SimulateControllerSimulateTransactionsData,
  SimulateTransactionBody,
  SpecificBoringPositionRequest,
  SpecificBoycoPositionRequest,
  SpecificRecipePositionRequest,
  SpecificVaultPositionRequest,
  SubscribeBoycoBody,
  SubscribeControllerSubscribeBoycoData,
  TokenControllerGetTokenDirectoryData,
  TokenControllerGetTokenQuoteData,
  TokenDirectoryRequestBody,
  TokenQuoteRequestBody,
  UserControllerGetUserInfoData,
  VaultAPLimitActionBody,
  VaultAPMarketActionBody,
  VaultControllerGetVaultInfoData,
  VaultControllerGetVaultsData,
  VaultInfoRequestBody,
  VaultIPAddIncentivesActionBody,
  VaultIPExtendIncentivesActionBody,
  VaultIPRefundIncentivesActionBody,
  WalletLinkConfirmBody,
  WalletLinkInitBody,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Health
   * @name HealthControllerCheck
   * @request GET:/api/health
   * @secure
   */
  healthControllerCheck = (params: RequestParams = {}) =>
    this.request<HealthControllerCheckData, HealthControllerCheckError>({
      path: `/api/health`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get token quote for a given token based on the chain id and contract address
   *
   * @tags Token
   * @name TokenControllerGetTokenQuote
   * @summary Get token quote
   * @request POST:/api/v1/token/quote/{chainId}/{contractAddress}
   * @secure
   */
  tokenControllerGetTokenQuote = (
    chainId: number,
    contractAddress: string,
    data?: TokenQuoteRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<TokenControllerGetTokenQuoteData, any>({
      path: `/api/v1/token/quote/${chainId}/${contractAddress}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get token directory based on the filters and page
   *
   * @tags Token
   * @name TokenControllerGetTokenDirectory
   * @summary Get token directory
   * @request POST:/api/v1/token/directory
   * @secure
   */
  tokenControllerGetTokenDirectory = (
    data?: TokenDirectoryRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<TokenControllerGetTokenDirectoryData, any>({
      path: `/api/v1/token/directory`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get offers for all recipe markets.
   *
   * @tags Offer
   * @name OfferControllerGetRecipeOffers
   * @summary Get recipe offers
   * @request POST:/api/v1/offer/recipe
   * @secure
   */
  offerControllerGetRecipeOffers = (
    data?: BaseRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<OfferControllerGetRecipeOffersData, any>({
      path: `/api/v1/offer/recipe`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get offers for all vault markets.
   *
   * @tags Offer
   * @name OfferControllerGetVaultOffers
   * @summary Get vault offers
   * @request POST:/api/v1/offer/vault
   * @secure
   */
  offerControllerGetVaultOffers = (
    data?: BaseRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<OfferControllerGetVaultOffersData, any>({
      path: `/api/v1/offer/vault`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Addons
   * @name AddonsControllerGetIncentives
   * @request GET:/api/v1/addons/test/{id}
   */
  addonsControllerGetIncentives = (id: string, params: RequestParams = {}) =>
    this.request<AddonsControllerGetIncentivesData, any>({
      path: `/api/v1/addons/test/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Addons
   * @name AddonsControllerRefreshIncentives
   * @request GET:/api/v1/addons/refresh/{id}
   */
  addonsControllerRefreshIncentives = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AddonsControllerRefreshIncentivesData, any>({
      path: `/api/v1/addons/refresh/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Get market info by global market id: chainId_marketType_marketId
   *
   * @tags Market
   * @name MarketControllerGetMarket
   * @summary Get market info
   * @request POST:/api/v1/market/info/{id}
   * @secure
   */
  marketControllerGetMarket = (
    id: string,
    data?: InfoMarketBody,
    params: RequestParams = {},
  ) =>
    this.request<MarketControllerGetMarketData, any>({
      path: `/api/v1/market/info/${id}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get all markets. Use filters property in body to filter out by market id, chain id, etc. Since response is paginated, use pagination properties in body to get next page based on size property of page. Do note: max page size for response is 500.
   *
   * @tags Market
   * @name MarketControllerGetMarkets
   * @summary Get all markets
   * @request POST:/api/v1/market/explore
   * @secure
   */
  marketControllerGetMarkets = (
    data?: ExploreMarketBody,
    params: RequestParams = {},
  ) =>
    this.request<MarketControllerGetMarketsData, any>({
      path: `/api/v1/market/explore`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Market
   * @name MarketControllerGetMarketSettings
   * @request POST:/api/v1/market/explore/settings
   * @secure
   */
  marketControllerGetMarketSettings = (
    data?: ExploreSettingsMarketBody,
    params: RequestParams = {},
  ) =>
    this.request<MarketControllerGetMarketSettingsData, any>({
      path: `/api/v1/market/explore/settings`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a market
   *
   * @tags Market
   * @name MarketControllerCreateMarket
   * @summary Create a market
   * @request POST:/api/v1/market/create
   * @secure
   */
  marketControllerCreateMarket = (
    data: CreateMarketBody,
    params: RequestParams = {},
  ) =>
    this.request<MarketControllerCreateMarketData, any>({
      path: `/api/v1/market/create`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get info for a vault
   *
   * @tags Vault
   * @name VaultControllerGetVaultInfo
   * @summary Get vault info
   * @request POST:/api/v1/vault/info/{id}
   * @secure
   */
  vaultControllerGetVaultInfo = (
    id: string,
    data?: VaultInfoRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<VaultControllerGetVaultInfoData, any>({
      path: `/api/v1/vault/info/${id}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get all vaults. Use filters property in body to filter out by vault id, chain id, etc. Since response is paginated, use pagination properties in body to get next page based on size property of page. Do note: max page size for response is 500.
   *
   * @tags Vault
   * @name VaultControllerGetVaults
   * @summary Get all vaults
   * @request POST:/api/v1/vault/explore
   * @secure
   */
  vaultControllerGetVaults = (
    data?: ExploreVaultBody,
    params: RequestParams = {},
  ) =>
    this.request<VaultControllerGetVaultsData, any>({
      path: `/api/v1/vault/explore`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get total assets for an account
   *
   * @tags Position
   * @name PositionControllerGetGlobalPositions
   * @summary Get total assets for an account
   * @request POST:/api/v1/position/global/{accountAddress}
   * @secure
   */
  positionControllerGetGlobalPositions = (
    accountAddress: string,
    data?: GlobalPositionRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetGlobalPositionsData, any>({
      path: `/api/v1/position/global/${accountAddress}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get positions for all recipe markets. Use filters property in body to filter out by market id, chain id, etc. Since response is paginated, use pagination properties in body to get next page based on size property of page. Do note: max page size for response is 500.
   *
   * @tags Position
   * @name PositionControllerGetRecipePositions
   * @summary Get recipe positions
   * @request POST:/api/v1/position/recipe
   * @secure
   */
  positionControllerGetRecipePositions = (
    data?: BaseRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetRecipePositionsData, any>({
      path: `/api/v1/position/recipe`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get position of an account address inside a recipe market.
   *
   * @tags Position
   * @name PositionControllerGetSpecificRecipePosition
   * @summary Get recipe position of an account address inside a recipe market
   * @request POST:/api/v1/position/recipe/{id}/{accountAddress}
   * @secure
   */
  positionControllerGetSpecificRecipePosition = (
    id: string,
    accountAddress: string,
    data?: SpecificRecipePositionRequest,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetSpecificRecipePositionData, any>({
      path: `/api/v1/position/recipe/${id}/${accountAddress}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get positions for all vaults. Use filters property in body to filter out by vault id, chain id, etc. Since response is paginated, use pagination properties in body to get next page based on size property of page. Do note: max page size for response is 500.
   *
   * @tags Position
   * @name PositionControllerGetVaultPositions
   * @summary Get vault positions
   * @request POST:/api/v1/position/vault
   * @secure
   */
  positionControllerGetVaultPositions = (
    data?: BaseRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetVaultPositionsData, any>({
      path: `/api/v1/position/vault`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get position of an account address inside a vault.
   *
   * @tags Position
   * @name PositionControllerGetSpecificVaultPosition
   * @summary Get vault position of an account address inside a vault
   * @request POST:/api/v1/position/vault/{id}/{accountAddress}
   * @secure
   */
  positionControllerGetSpecificVaultPosition = (
    id: string,
    accountAddress: string,
    data?: SpecificVaultPositionRequest,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetSpecificVaultPositionData, any>({
      path: `/api/v1/position/vault/${id}/${accountAddress}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get positions for all boyco markets. Use filters property in body to filter out by market id, chain id, etc. Since response is paginated, use pagination properties in body to get next page based on size property of page. Do note: max page size for response is 500.
   *
   * @tags Position
   * @name PositionControllerGetBoycoPositions
   * @summary Get boyco positions
   * @request POST:/api/v1/position/boyco
   * @secure
   */
  positionControllerGetBoycoPositions = (
    data?: BaseRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetBoycoPositionsData, any>({
      path: `/api/v1/position/boyco`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get position of an account address inside a boyco market.
   *
   * @tags Position
   * @name PositionControllerGetSpecificBoycoPosition
   * @summary Get boyco position of an account address inside a boyco market
   * @request POST:/api/v1/position/boyco/{id}/{accountAddress}
   * @secure
   */
  positionControllerGetSpecificBoycoPosition = (
    id: string,
    accountAddress: string,
    data?: SpecificBoycoPositionRequest,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetSpecificBoycoPositionData, any>({
      path: `/api/v1/position/boyco/${id}/${accountAddress}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get positions for all boring markets. Use filters property in body to filter out by vault id, chain id, etc. Since response is paginated, use pagination properties in body to get next page based on size property of page. Do note: max page size for response is 500.
   *
   * @tags Position
   * @name PositionControllerGetBoringPositions
   * @summary Get boring positions
   * @request POST:/api/v1/position/boring
   * @secure
   */
  positionControllerGetBoringPositions = (
    data?: BaseRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetBoringPositionsData, any>({
      path: `/api/v1/position/boring`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get position of an account address inside a vault.
   *
   * @tags Position
   * @name PositionControllerGetSpecificBoringPosition
   * @summary Get boring position of an account address inside a vault
   * @request POST:/api/v1/position/boring/{id}/{accountAddress}
   * @secure
   */
  positionControllerGetSpecificBoringPosition = (
    id: string,
    accountAddress: string,
    data?: SpecificBoringPositionRequest,
    params: RequestParams = {},
  ) =>
    this.request<PositionControllerGetSpecificBoringPositionData, any>({
      path: `/api/v1/position/boring/${id}/${accountAddress}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get basic contract data for a given contract address on a specific chain
   *
   * @tags Contract
   * @name ContractControllerGetContract
   * @summary Get contract data
   * @request GET:/api/v1/contract/{chainId}/{contractAddress}
   * @secure
   */
  contractControllerGetContract = (
    chainId: number,
    contractAddress: string,
    params: RequestParams = {},
  ) =>
    this.request<ContractControllerGetContractData, any>({
      path: `/api/v1/contract/${chainId}/${contractAddress}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get chart for a given market id
   *
   * @tags Chart
   * @name ChartControllerGetMarketChart
   * @summary Get chart
   * @request POST:/api/v1/chart/{id}
   * @secure
   */
  chartControllerGetMarketChart = (
    id: string,
    data?: ChartRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<ChartControllerGetMarketChartData, any>({
      path: `/api/v1/chart/${id}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Recipe AP Market Action
   *
   * @tags Action
   * @name ActionControllerRecipeApMarketAction
   * @summary Recipe AP Market Action
   * @request POST:/api/v1/action/recipe/ap/market
   * @secure
   */
  actionControllerRecipeApMarketAction = (
    data: RecipeAPMarketActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerRecipeApMarketActionData, any>({
      path: `/api/v1/action/recipe/ap/market`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Recipe IP Market Action
   *
   * @tags Action
   * @name ActionControllerRecipeIpMarketAction
   * @summary Recipe IP Market Action
   * @request POST:/api/v1/action/recipe/ip/market
   * @secure
   */
  actionControllerRecipeIpMarketAction = (
    data: RecipeIPMarketActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerRecipeIpMarketActionData, any>({
      path: `/api/v1/action/recipe/ip/market`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Recipe IP Limit Action
   *
   * @tags Action
   * @name ActionControllerRecipeIpLimitAction
   * @summary Recipe IP Limit Action
   * @request POST:/api/v1/action/recipe/ip/limit
   * @secure
   */
  actionControllerRecipeIpLimitAction = (
    data: RecipeIPLimitActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerRecipeIpLimitActionData, any>({
      path: `/api/v1/action/recipe/ip/limit`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Recipe AP Limit Action
   *
   * @tags Action
   * @name ActionControllerRecipeApLimitAction
   * @summary Recipe AP Limit Action
   * @request POST:/api/v1/action/recipe/ap/limit
   * @secure
   */
  actionControllerRecipeApLimitAction = (
    data: RecipeAPLimitActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerRecipeApLimitActionData, any>({
      path: `/api/v1/action/recipe/ap/limit`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Vault AP Market Action
   *
   * @tags Action
   * @name ActionControllerVaultApMarketAction
   * @summary Vault AP Market Action
   * @request POST:/api/v1/action/vault/ap/market
   * @secure
   */
  actionControllerVaultApMarketAction = (
    data: VaultAPMarketActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerVaultApMarketActionData, any>({
      path: `/api/v1/action/vault/ap/market`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Vault AP Limit Action
   *
   * @tags Action
   * @name ActionControllerVaultApLimitAction
   * @summary Vault AP Limit Action
   * @request POST:/api/v1/action/vault/ap/limit
   * @secure
   */
  actionControllerVaultApLimitAction = (
    data: VaultAPLimitActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerVaultApLimitActionData, any>({
      path: `/api/v1/action/vault/ap/limit`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Vault IP Add Incentives Action
   *
   * @tags Action
   * @name ActionControllerVaultIpAddIncentivesAction
   * @summary Vault IP Add Incentives Action
   * @request POST:/api/v1/action/vault/ip/add
   * @secure
   */
  actionControllerVaultIpAddIncentivesAction = (
    data: VaultIPAddIncentivesActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerVaultIpAddIncentivesActionData, any>({
      path: `/api/v1/action/vault/ip/add`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Vault IP Extend Incentives Action
   *
   * @tags Action
   * @name ActionControllerVaultIpExtendIncentivesAction
   * @summary Vault IP Extend Incentives Action
   * @request POST:/api/v1/action/vault/ip/extend
   * @secure
   */
  actionControllerVaultIpExtendIncentivesAction = (
    data: VaultIPExtendIncentivesActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerVaultIpExtendIncentivesActionData, any>({
      path: `/api/v1/action/vault/ip/extend`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Vault IP Refund Incentives Action
   *
   * @tags Action
   * @name ActionControllerVaultIpRefundIncentivesAction
   * @summary Vault IP Refund Incentives Action
   * @request POST:/api/v1/action/vault/ip/refund
   * @secure
   */
  actionControllerVaultIpRefundIncentivesAction = (
    data: VaultIPRefundIncentivesActionBody,
    params: RequestParams = {},
  ) =>
    this.request<ActionControllerVaultIpRefundIncentivesActionData, any>({
      path: `/api/v1/action/vault/ip/refund`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get point directory based on the filters and page
   *
   * @tags Point
   * @name PointControllerGetPointDirectory
   * @summary Get point directory
   * @request POST:/api/v1/point/directory
   * @secure
   */
  pointControllerGetPointDirectory = (
    data?: PointDirectoryRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<PointControllerGetPointDirectoryData, any>({
      path: `/api/v1/point/directory`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Subscribe to Royco Updates
   *
   * @tags Subscribe
   * @name SubscribeControllerSubscribeBoyco
   * @summary Subscribe to Royco Updates
   * @request POST:/api/v1/subscribe/boyco
   * @secure
   */
  subscribeControllerSubscribeBoyco = (
    data: SubscribeBoycoBody,
    params: RequestParams = {},
  ) =>
    this.request<SubscribeControllerSubscribeBoycoData, any>({
      path: `/api/v1/subscribe/boyco`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Simulate a series of transactions to determine their effects
   *
   * @tags Simulate
   * @name SimulateControllerSimulateTransactions
   * @summary Simulate transactions
   * @request POST:/api/v1/simulate/{accountAddress}
   * @secure
   */
  simulateControllerSimulateTransactions = (
    accountAddress: string,
    data: SimulateTransactionBody,
    params: RequestParams = {},
  ) =>
    this.request<SimulateControllerSimulateTransactionsData, any>({
      path: `/api/v1/simulate/${accountAddress}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get nonce for authentication
   *
   * @tags Auth
   * @name AuthControllerGetNonce
   * @summary Get nonce
   * @request POST:/api/v1/auth/nonce
   * @secure
   */
  authControllerGetNonce = (params: RequestParams = {}) =>
    this.request<AuthControllerGetNonceData, any>({
      path: `/api/v1/auth/nonce`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get session status
   *
   * @tags Auth
   * @name AuthControllerGetSession
   * @summary Get session
   * @request POST:/api/v1/auth/session
   * @secure
   */
  authControllerGetSession = (data: SessionBody, params: RequestParams = {}) =>
    this.request<AuthControllerGetSessionData, any>({
      path: `/api/v1/auth/session`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Login to the application
   *
   * @tags Auth
   * @name AuthControllerLogin
   * @summary Login
   * @request POST:/api/v1/auth/login
   * @secure
   */
  authControllerLogin = (data: LoginBody, params: RequestParams = {}) =>
    this.request<AuthControllerLoginData, any>({
      path: `/api/v1/auth/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Logout from the application
   *
   * @tags Auth
   * @name AuthControllerLogout
   * @summary Logout
   * @request POST:/api/v1/auth/logout
   * @secure
   */
  authControllerLogout = (data: LogoutBody, params: RequestParams = {}) =>
    this.request<AuthControllerLogoutData, any>({
      path: `/api/v1/auth/logout`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerEditUser
   * @request POST:/api/v1/auth/user
   */
  authControllerEditUser = (data: EditUserBody, params: RequestParams = {}) =>
    this.request<AuthControllerEditUserData, any>({
      path: `/api/v1/auth/user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerInitWalletLink
   * @request POST:/api/v1/auth/verify/init
   */
  authControllerInitWalletLink = (
    data: WalletLinkInitBody,
    params: RequestParams = {},
  ) =>
    this.request<AuthControllerInitWalletLinkData, any>({
      path: `/api/v1/auth/verify/init`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerConfirmWalletLink
   * @request POST:/api/v1/auth/verify/confirm
   */
  authControllerConfirmWalletLink = (
    data: WalletLinkConfirmBody,
    params: RequestParams = {},
  ) =>
    this.request<AuthControllerConfirmWalletLinkData, any>({
      path: `/api/v1/auth/verify/confirm`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get activities given filters and sorting
   *
   * @tags Activity
   * @name ActivityControllerGetActivities
   * @summary Get activities
   * @request POST:/api/v1/activity
   * @secure
   */
  activityControllerGetActivities = (
    data?: ActivityBody,
    params: RequestParams = {},
  ) =>
    this.request<ActivityControllerGetActivitiesData, any>({
      path: `/api/v1/activity`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerGetUserInfo
   * @request POST:/api/v1/user/info
   * @secure
   */
  userControllerGetUserInfo = (
    data: GetUserInfoBody,
    params: RequestParams = {},
  ) =>
    this.request<UserControllerGetUserInfoData, any>({
      path: `/api/v1/user/info`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}

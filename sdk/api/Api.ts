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
  BaseRequestBody,
  BoringPositionResponse,
  BoycoPositionResponse,
  ChartRequestBody,
  ChartResponse,
  ContractResponse,
  CreateMarketBody,
  CreateMarketResponse,
  ExploreMarketBody,
  ExploreMarketResponse,
  ExploreSettingsMarketBody,
  ExploreSettingsMarketResponse,
  InfoMarketBody,
  InfoMarketResponse,
  PointDirectoryRequestBody,
  PointDirectoryResponse,
  RecipeAPLimitActionBody,
  RecipeAPLimitActionResponse,
  RecipeAPMarketActionBody,
  RecipeAPMarketActionResponse,
  RecipeIPLimitActionBody,
  RecipeIPLimitActionResponse,
  RecipeIPMarketActionBody,
  RecipeIPMarketActionResponse,
  RecipePositionResponse,
  SpecificBoringPositionRequest,
  SpecificBoringPositionResponse,
  SpecificBoycoPositionRequest,
  SpecificBoycoPositionResponse,
  SpecificRecipePositionRequest,
  SpecificRecipePositionResponse,
  SpecificVaultPositionRequest,
  SpecificVaultPositionResponse,
  StatsFinalResponse,
  StatsRequestBody,
  TokenDirectoryRequestBody,
  TokenDirectoryResponse,
  TokenQuoteRequestBody,
  TokenQuoteResponse,
  VaultAPLimitActionBody,
  VaultAPLimitActionResponse,
  VaultAPMarketActionBody,
  VaultAPMarketActionResponse,
  VaultInfoRequestBody,
  VaultInfoResponse,
  VaultPositionResponse,
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
    this.request<
      {
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
      },
      {
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
      }
    >({
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
    this.request<TokenQuoteResponse, any>({
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
    this.request<TokenDirectoryResponse, any>({
      path: `/api/v1/token/directory`,
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
    this.request<void, any>({
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
    this.request<void, any>({
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
    this.request<InfoMarketResponse, any>({
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
    this.request<ExploreMarketResponse, any>({
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
    this.request<ExploreSettingsMarketResponse, any>({
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
    this.request<CreateMarketResponse, any>({
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
    this.request<VaultInfoResponse, any>({
      path: `/api/v1/vault/info/${id}`,
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
    this.request<RecipePositionResponse, any>({
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
    this.request<SpecificRecipePositionResponse, any>({
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
    this.request<VaultPositionResponse, any>({
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
    this.request<SpecificVaultPositionResponse, any>({
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
    this.request<BoycoPositionResponse, any>({
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
    this.request<SpecificBoycoPositionResponse, any>({
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
    this.request<BoringPositionResponse, any>({
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
    this.request<SpecificBoringPositionResponse, any>({
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
    this.request<ContractResponse, any>({
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
    this.request<ChartResponse, any>({
      path: `/api/v1/chart/${id}`,
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
   * @tags Stats
   * @name StatsControllerGetStats
   * @summary Get total assets for an account
   * @request POST:/api/v1/stats/assets/{accountAddress}
   * @secure
   */
  statsControllerGetStats = (
    accountAddress: string,
    data?: StatsRequestBody,
    params: RequestParams = {},
  ) =>
    this.request<StatsFinalResponse, any>({
      path: `/api/v1/stats/assets/${accountAddress}`,
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
    this.request<RecipeAPMarketActionResponse, any>({
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
    this.request<RecipeIPMarketActionResponse, any>({
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
    this.request<RecipeIPLimitActionResponse, any>({
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
    this.request<RecipeAPLimitActionResponse, any>({
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
    this.request<VaultAPMarketActionResponse, any>({
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
    this.request<VaultAPLimitActionResponse, any>({
      path: `/api/v1/action/vault/ap/limit`,
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
    this.request<PointDirectoryResponse, any>({
      path: `/api/v1/point/directory`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

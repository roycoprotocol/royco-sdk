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
  AuthControllerConfirmWalletLinkData,
  AuthControllerEditUserData,
  AuthControllerGetNonceData,
  AuthControllerInitWalletLinkData,
  AuthControllerLoginData,
  AuthControllerLogoutData,
  EditUserBody,
  LoginBody,
  LogoutBody,
  NonceBody,
  WalletLinkConfirmBody,
  WalletLinkInitBody,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class V1<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerGetNonce
   * @request POST:/v1/auth/nonce
   */
  authControllerGetNonce = (data: NonceBody, params: RequestParams = {}) =>
    this.request<AuthControllerGetNonceData, any>({
      path: `/v1/auth/nonce`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogin
   * @request POST:/v1/auth/login
   */
  authControllerLogin = (data: LoginBody, params: RequestParams = {}) =>
    this.request<AuthControllerLoginData, any>({
      path: `/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerEditUser
   * @request POST:/v1/auth/user
   */
  authControllerEditUser = (data: EditUserBody, params: RequestParams = {}) =>
    this.request<AuthControllerEditUserData, any>({
      path: `/v1/auth/user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogout
   * @request POST:/v1/auth/logout
   */
  authControllerLogout = (data: LogoutBody, params: RequestParams = {}) =>
    this.request<AuthControllerLogoutData, any>({
      path: `/v1/auth/logout`,
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
   * @request POST:/v1/auth/verify/init
   */
  authControllerInitWalletLink = (
    data: WalletLinkInitBody,
    params: RequestParams = {},
  ) =>
    this.request<AuthControllerInitWalletLinkData, any>({
      path: `/v1/auth/verify/init`,
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
   * @request POST:/v1/auth/verify/confirm
   */
  authControllerConfirmWalletLink = (
    data: WalletLinkConfirmBody,
    params: RequestParams = {},
  ) =>
    this.request<AuthControllerConfirmWalletLinkData, any>({
      path: `/v1/auth/verify/confirm`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}

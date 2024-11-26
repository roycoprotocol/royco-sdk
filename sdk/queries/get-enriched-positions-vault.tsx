import type { TypedRoycoClient, TypedRpcApiKeys } from "@/sdk/client";
import type {
  BaseQueryFilter,
  BaseSortingFilter,
  CustomTokenData,
  Database,
} from "@/sdk/types";
import type { SupportedToken } from "@/sdk/constants";
import type { Abi, Address } from "viem";
import type { UseQueryOptions } from "@tanstack/react-query";

import { getSupportedToken } from "@/sdk/constants";
import {
  getChain,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { createPublicClient, http } from "viem";
import { RoycoMarketUserType } from "@/sdk/market";
import { ContractMap } from "@/sdk/contracts";

const constructEnrichedPositionsVaultFilterClauses = (
  filters: BaseQueryFilter[] | undefined,
): string | undefined => {
  if (!filters) return undefined;

  let offerSideFilter = "";

  filters.forEach((filter) => {
    switch (filter.id) {
      case "offer_side":
        if (offerSideFilter) offerSideFilter += " OR ";
        if (filter.condition === "NOT") {
          offerSideFilter += `offer_side <> ${filter.value}`;
        } else {
          offerSideFilter += `offer_side = ${filter.value}`;
        }
        break;
    }
  });

  let filterClauses = "";

  if (offerSideFilter) filterClauses += `(${offerSideFilter}) AND `;

  if (filterClauses) {
    filterClauses = filterClauses.slice(0, -5); // Remove the trailing " AND "
  }

  return filterClauses;
};

export type EnrichedPositionsVaultDataType =
  Database["public"]["CompositeTypes"]["enriched_positions_vault_data_type"] & {
    tokens_data: Array<
      SupportedToken & {
        raw_amount: string;
        token_amount: number;
        token_amount_usd: number;
        price: number;
        fdv: number;
        total_supply: number;
      }
    >;
    input_token_data: Array<
      SupportedToken & {
        raw_amount: string;
        token_amount: number;
        token_amount_usd: number;
        price: number;
        fdv: number;
        total_supply: number;
        shares: string;
      }
    >;
    annual_change_ratio: number;
  };

export const getEnrichedPositionsVaultQueryOptions = (
  client: TypedRoycoClient,
  RPC_API_KEYS: TypedRpcApiKeys,
  account_address: string,
  chain_id?: number,
  market_id?: string,
  custom_token_data?: CustomTokenData,
  page_index: number = 0,
  filters: Array<BaseQueryFilter> = [],
  sorting?: Array<BaseSortingFilter>,
): UseQueryOptions => ({
  queryKey: [
    "enriched-positions-vault",
    account_address,
    chain_id,
    market_id,
    custom_token_data,
    page_index,
    ...filters.map((filter) => `${filter.id}:${filter.value}`),
    ...(sorting?.map((sorting) => `${sorting.id}:${sorting.desc}`) ?? []),
  ],
  queryFn: async () => {
    const filterClauses = constructEnrichedPositionsVaultFilterClauses(filters);

    const result = await client.rpc("get_enriched_positions_vault", {
      account_address: account_address,
      chain_id: chain_id,
      market_id: market_id,
      custom_token_data,
      page_index: page_index,
      filters: filterClauses,
      sorting: undefined, // @TODO Update this
    });

    if (!!result.data && !!result.data.data && result.data.data.length > 0) {
      const rows = result.data.data;

      const new_rows = await Promise.all(
        rows.map(async (row) => {
          if (
            !!row.input_token_id &&
            !!row.token_ids &&
            !!row.token_amounts &&
            row.chain_id
          ) {
            // Get the chain
            const chain = getChain(row.chain_id);

            // Create the public client
            const publicClient = createPublicClient({
              chain,
              transport: http(RPC_API_KEYS[row.chain_id]),
            });

            // Create the contracts array for incentives
            const incentives_ap_contracts = row.token_ids.map(
              (incentiveId) => ({
                address: row.market_id as Address,
                abi: ContractMap[row.chain_id as keyof typeof ContractMap][
                  "WrappedVault"
                ].abi as Abi,
                functionName: "currentUserRewards",
                args: [incentiveId.split("-")[1], account_address],
              }),
            );

            // Get the raw incentives amount for AP
            const raw_incentives_amount_ap_data = await publicClient.multicall({
              contracts: incentives_ap_contracts,
            });

            const tokens_data = row.token_ids.map((tokenId, tokenIndex) => {
              const token_price: number =
                row.token_price_values?.[tokenIndex] ?? 0;
              const token_fdv: number = row.token_fdv_values?.[tokenIndex] ?? 0;
              const token_total_supply: number =
                row.token_total_supply_values?.[tokenIndex] ?? 0;

              const token_info: SupportedToken = getSupportedToken(tokenId);

              let raw_amount: string = "0";

              if (row.offer_side === RoycoMarketUserType.ap.value) {
                raw_amount = parseRawAmount(
                  raw_incentives_amount_ap_data[
                    tokenIndex
                  ]?.result?.toString() ?? "0",
                );
              } else {
                raw_amount = parseRawAmount(
                  row.token_amounts && row.token_amounts[tokenIndex],
                );
              }

              const token_amount: number = parseRawAmountToTokenAmount(
                raw_amount,
                token_info.decimals,
              );

              const token_amount_usd = parseTokenAmountToTokenAmountUsd(
                token_amount,
                token_price,
              );

              return {
                ...token_info,
                raw_amount,
                token_amount,
                token_amount_usd,
                price: token_price,
                fdv: token_fdv,
                total_supply: token_total_supply,
              };
            });

            const raw_input_token_amount_ap_data = await publicClient.multicall(
              {
                contracts: [
                  {
                    address: row.market_id as Address,
                    abi: ContractMap[row.chain_id as keyof typeof ContractMap][
                      "WrappedVault"
                    ].abi as Abi,
                    functionName: "convertToAssets",
                    args: [row.quantity],
                  },
                ],
              },
            );

            const input_token_info: SupportedToken = getSupportedToken(
              row.input_token_id,
            );

            let raw_input_token_amount: string = "0";

            if (row.offer_side === RoycoMarketUserType.ap.value) {
              // const raw_input_token_amount_data = await publicClient.multicall({
              //   contracts: [
              //     {
              //       address: market_id as Address,
              //       abi: ContractMap[chain_id as keyof typeof ContractMap][
              //         "WrappedVault"
              //       ].abi as Abi,
              //       functionName: "convertToAssets",
              //       args: [row.quantity],
              //     },
              //   ],
              // });

              raw_input_token_amount = parseRawAmount(
                raw_input_token_amount_ap_data[0].status === "success"
                  ? raw_input_token_amount_ap_data[0].result?.toString() ?? "0"
                  : "0",
              );
            } else {
              raw_input_token_amount = row.quantity ?? "0";
            }

            const input_token_price: number = row.input_token_price ?? 0;
            const input_token_fdv: number = row.input_token_fdv ?? 0;
            const input_token_total_supply: number =
              row.input_token_total_supply ?? 0;
            const input_token_raw_amount: string = raw_input_token_amount;

            const input_token_token_amount: number =
              parseRawAmountToTokenAmount(
                input_token_raw_amount,
                input_token_info.decimals,
              );

            const input_token_token_amount_usd =
              parseTokenAmountToTokenAmountUsd(
                input_token_token_amount,
                input_token_price,
              );

            const input_token_data = {
              ...input_token_info,
              raw_amount: input_token_raw_amount,
              token_amount: input_token_token_amount,
              token_amount_usd: input_token_token_amount_usd,
              price: input_token_price,
              fdv: input_token_fdv,
              total_supply: input_token_total_supply,
              shares: row.quantity,
            };

            return {
              ...row,
              reward_style: 0,
              tokens_data,
              input_token_data,
            };
          }
        }),
      );

      return {
        count: result.data.count,
        data: new_rows,
      };
    }

    return result;
  },

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

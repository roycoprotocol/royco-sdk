import type { TypedRoycoClient } from "@/sdk/client";
import type { BaseQueryFilter, BaseSortingFilter, Database } from "@/sdk/types";
import type { SupportedToken } from "@/sdk/constants";

import { getSupportedToken } from "@/sdk/constants";
import {
  constructBaseSortingFilterClauses,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseRawAmountToTokenAmountUsd,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";

export const constructEnrichedPositionsBoycoFilterClauses = (
  filters: Array<BaseQueryFilter> | undefined,
): string | undefined => {
  if (!filters) return undefined;

  let filterClauses = "";

  return filterClauses;
};

export type EnrichedPositionsBoycoDataType =
  Database["public"]["CompositeTypes"]["enriched_positions_boyco_data_type"] & {
    token_0_data: SupportedToken & {
      raw_amount: string;
      token_amount: number;
      token_amount_usd: number;
      price: number;
    };
    receipt_token_data: SupportedToken & {
      raw_amount: string;
      token_amount: number;
      token_amount_usd: number;
      price: number;
    };
    token_1_datas: Array<
      SupportedToken & {
        raw_amount: string;
        token_amount: number;
        token_amount_usd: number;
        price: number;
      }
    >;
  };

export type GetEnrichedPositionsBoycoQueryParams = {
  account_address: string;
  market_id?: string;
  page_index?: number;
  page_size?: number;
  filters?: Array<BaseQueryFilter>;
  sorting?: Array<BaseSortingFilter>;
};

export type GetEnrichedPositionsBoycoQueryOptionsParams =
  GetEnrichedPositionsBoycoQueryParams & {
    client: TypedRoycoClient;
  };

export const getEnrichedPositionsBoycoQueryFunction = async ({
  client,
  account_address,
  market_id,
  page_index,
  page_size,
  filters,
  sorting,
}: GetEnrichedPositionsBoycoQueryOptionsParams) => {
  const filter_clauses = constructEnrichedPositionsBoycoFilterClauses(filters);
  const sorting_clauses = constructBaseSortingFilterClauses(sorting);

  const result = await client.rpc("get_enriched_positions_boyco", {
    account_address,
    market_id,
    page_index,
    page_size,
    filters: filter_clauses,
    sorting: sorting_clauses,
  });

  if (!!result.data && !!result.data.data && result.data.data.length > 0) {
    const rows = result.data.data;

    const new_rows = rows
      .map((row) => {
        if (!!row.token_0_id) {
          const token_0_info: SupportedToken = getSupportedToken(
            row.token_0_id,
          );

          const token_0_data = {
            ...token_0_info,
            raw_amount: row.token_0_amount ?? "0",
            token_amount: parseRawAmountToTokenAmount(
              row.token_0_amount ?? "0",
              token_0_info.decimals ?? 0,
            ),
            token_amount_usd: parseRawAmountToTokenAmountUsd(
              row.token_0_amount ?? "0",
              row.token_0_price ?? 0,
              token_0_info.decimals,
            ),
            price: row.token_0_price ?? 0,
          };

          const receipt_token_info: SupportedToken = getSupportedToken(
            row.receipt_token_id ?? "",
          );

          const receipt_token_data = {
            ...receipt_token_info,
            raw_amount: row.receipt_token_amount ?? "0",
            token_amount: parseRawAmountToTokenAmount(
              row.receipt_token_amount ?? "0",
              row.receipt_token_decimals ?? 0,
            ),
            token_amount_usd: parseRawAmountToTokenAmountUsd(
              row.receipt_token_amount ?? "0",
              row.receipt_token_price ?? 0,
              row.receipt_token_decimals ?? 0,
            ),
            price: row.receipt_token_price ?? 0,
          };

          const token_1_datas = (row.token_1_ids ?? []).map(
            (token_1_id, index) => {
              const token_1_info: SupportedToken =
                getSupportedToken(token_1_id);

              return {
                ...token_1_info,
                raw_amount: row.token_1_amounts?.[index] ?? "0",
                token_amount: parseRawAmountToTokenAmount(
                  row.token_1_amounts?.[index] ?? "0",
                  token_1_info.decimals ?? 0,
                ),
                token_amount_usd: 0,
                price: 0,
              };
            },
          );

          return {
            ...row,
            token_0_data,
            receipt_token_data,
            token_1_datas,
          };
        }

        return null;
      })
      .filter((row) => !!row);

    return {
      count: result.data.count ?? 0,
      data: new_rows as Array<EnrichedPositionsBoycoDataType> | null,
    };
  }

  return {
    count: 0,
    data: null as Array<EnrichedPositionsBoycoDataType> | null,
  };
};

export const getEnrichedPositionsBoycoQueryOptions = ({
  client,
  account_address,
  market_id,
  page_index = 0,
  page_size = 20,
  filters = [],
  sorting = [],
}: GetEnrichedPositionsBoycoQueryOptionsParams) => ({
  queryKey: [
    "get-enriched-positions-boyco",
    {
      account_address,
      market_id,
      page_index,
      page_size,
      filters,
      sorting,
    },
  ],
  queryFn: () =>
    getEnrichedPositionsBoycoQueryFunction({
      client,
      account_address,
      market_id,
      page_index,
      page_size,
      filters,
      sorting,
    }),

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 10, // 10 mins
  refetchOnWindowFocus: false,
});

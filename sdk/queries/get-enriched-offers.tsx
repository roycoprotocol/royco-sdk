import type { TypedRoycoClient } from "@/sdk/client";
import type { SupportedToken } from "@/sdk/constants";
import type {
  BaseQueryFilter,
  BaseSortingFilter,
  CustomTokenData,
  Database,
} from "@/sdk/types";

import { getSupportedToken } from "@/sdk/constants";
import {
  constructBaseSortingFilterClauses,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { RoycoMarketType } from "@/sdk/market";

const constructOfferFilterClauses = (
  filters: BaseQueryFilter[] | undefined,
): string | undefined => {
  if (!filters) return undefined;

  let offerSideFilter = "";
  let isCancelledFilter = "";

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
      case "is_cancelled":
        if (isCancelledFilter) isCancelledFilter += " OR ";
        if (filter.condition === "NOT") {
          isCancelledFilter += `is_cancelled <> ${filter.value}`;
        } else {
          isCancelledFilter += `is_cancelled = ${filter.value}`;
        }
        break;
    }
  });

  let filterClauses = "";

  if (offerSideFilter) filterClauses += `(${offerSideFilter}) AND `;
  if (isCancelledFilter) filterClauses += `(${isCancelledFilter}) AND `;

  if (filterClauses) {
    filterClauses = filterClauses.slice(0, -5); // Remove the trailing " AND "
  }

  return filterClauses;
};

export type EnrichedOfferDataType =
  Database["public"]["CompositeTypes"]["enriched_offer_data_type"] & {
    tokens_data: Array<
      SupportedToken & {
        raw_amount: string;
        token_amount: number;
        token_amount_usd: number;
        price: number;
        fdv: number;
        total_supply: number;
        annual_change_ratio: number;
        per_input_token: number;
        rate_per_year: number;
      }
    >;
    input_token_data: SupportedToken & {
      raw_amount: string;
      token_amount: number;
      token_amount_usd: number;
      price: number;
      fdv: number;
      total_supply: number;
    };
  };

export type GetEnrichedOffersQueryParams = {
  chain_id: number;
  market_type?: number;
  market_id?: string;
  creator?: string;
  can_be_filled?: boolean;
  page_index?: number;
  page_size?: number;
  filters?: Array<BaseQueryFilter>;
  sorting?: Array<BaseSortingFilter>;
  custom_token_data?: CustomTokenData;
};

export type GetEnrichedOffersQueryOptionsParams =
  GetEnrichedOffersQueryParams & {
    client: TypedRoycoClient;
  };

export const getEnrichedOffersQueryFunction = async ({
  client,
  chain_id,
  market_type,
  market_id,
  creator,
  can_be_filled,
  page_index,
  page_size,
  filters,
  sorting,
  custom_token_data,
}: GetEnrichedOffersQueryOptionsParams) => {
  const filter_clauses = constructOfferFilterClauses(filters);
  const sorting_clauses = constructBaseSortingFilterClauses(sorting);

  const result = await client.rpc(
    "get_enriched_offers",
    {
      chain_id,
      market_type,
      market_id,
      creator,
      can_be_filled,
      page_index,
      page_size,
      filters: filter_clauses,
      sorting: sorting_clauses,
      custom_token_data,
    },
    {
      get: true,
    },
  );

  if (!!result.data && !!result.data.data && result.data.data.length > 0) {
    const rows = result.data.data;

    const new_rows = rows.map((row) => {
      if (
        !!row.input_token_id &&
        !!row.token_ids &&
        !!row.token_amounts &&
        !!row.protocol_fee_amounts &&
        !!row.frontend_fee_amounts
      ) {
        const input_token_info: SupportedToken = getSupportedToken(
          row.input_token_id,
        );
        const input_token_price: number = row.input_token_price ?? 0;
        const input_token_fdv: number = row.input_token_fdv ?? 0;
        const input_token_total_supply: number =
          row.input_token_total_supply ?? 0;
        const input_token_raw_amount: string = parseRawAmount(
          row.quantity ?? "0",
        );

        const input_token_token_amount: number = parseRawAmountToTokenAmount(
          row.quantity ?? "0",
          input_token_info.decimals,
        );

        const input_token_token_amount_usd = parseTokenAmountToTokenAmountUsd(
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
        };

        const tokens_data = row.token_ids.map((tokenId, tokenIndex) => {
          const token_price: number = row.token_price_values
            ? (row.token_price_values[tokenIndex] ?? 0)
            : 0;
          const token_fdv: number = row.token_fdv_values
            ? (row.token_fdv_values[tokenIndex] ?? 0)
            : 0;
          const token_total_supply: number = row.token_total_supply_values
            ? (row.token_total_supply_values[tokenIndex] ?? 0)
            : 0;

          const token_info: SupportedToken = getSupportedToken(tokenId);

          const raw_amount: string = parseRawAmount(
            row.token_amounts?.[tokenIndex],
          );

          const token_amount: number = parseRawAmountToTokenAmount(
            row.token_amounts?.[tokenIndex],
            token_info.decimals,
          );

          const token_amount_usd = parseTokenAmountToTokenAmountUsd(
            token_amount,
            token_price,
          );

          let per_input_token = 0;

          if (market_type === RoycoMarketType.recipe.value) {
            // Recipe Market
            per_input_token = token_amount / input_token_data.token_amount;
          } else {
            // Vault Market
            per_input_token = token_amount; // @note: This is rate per second
          }

          const annual_change_ratio =
            row.annual_change_ratios?.[tokenIndex] ?? 0;

          let rate_per_year = 0;

          if (market_type === RoycoMarketType.recipe.value) {
            // Recipe Market
            rate_per_year = 0;
          } else {
            // Vault Market
            rate_per_year = token_amount * (365 * 24 * 60 * 60);
          }

          return {
            ...token_info,
            raw_amount,
            token_amount,
            token_amount_usd,
            price: token_price,
            fdv: token_fdv,
            total_supply: token_total_supply,
            annual_change_ratio,
            per_input_token,
            rate_per_year,
          };
        });

        return {
          ...row,
          tokens_data,
          input_token_data,
        };
      }
    });

    return {
      count: result.data.count ?? 0,
      data: new_rows as Array<EnrichedOfferDataType> | null,
    };
  }

  return {
    count: 0,
    data: null as Array<EnrichedOfferDataType> | null,
  };
};

export const getEnrichedOffersQueryOptions = ({
  client,
  chain_id,
  market_type,
  market_id,
  creator,
  can_be_filled,
  page_index = 0,
  page_size = 20,
  filters = [],
  sorting = [],
  custom_token_data,
}: GetEnrichedOffersQueryOptionsParams) => ({
  queryKey: [
    "get-enriched-offers",
    {
      chain_id,
      market_type,
      market_id,
      creator,
      can_be_filled,
      page_index,
      page_size,
      filters,
      sorting,
      custom_token_data,
    },
  ],
  queryFn: () =>
    getEnrichedOffersQueryFunction({
      client,
      chain_id,
      market_type,
      market_id,
      creator,
      can_be_filled,
      page_index,
      page_size,
      filters,
      sorting,
      custom_token_data,
    }),

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

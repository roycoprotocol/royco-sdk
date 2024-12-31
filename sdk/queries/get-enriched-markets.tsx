import type { TypedRoycoClient, TypedRpcApiKeys } from "@/sdk/client";
import type { BaseSortingFilter, CustomTokenData, Database } from "@/sdk/types";
import type {
  SupportedChain,
  SupportedMarket,
  SupportedToken,
} from "@/sdk/constants";

import { getSupportedMarket, getSupportedToken } from "@/sdk/constants";
import {
  constructBaseSortingFilterClauses,
  getSupportedChain,
  parseNumber,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { RoycoMarketType } from "@/sdk/market";
import { http } from "viem";
import { createPublicClient } from "viem";

export type MarketFilter = {
  id: string;
  value: string | number | boolean;
  matches?: Array<string>;
  condition?: string;
};

const constructMarketFilterClauses = (
  filters: MarketFilter[] | undefined,
): string | undefined => {
  if (!filters) return undefined;

  let assetFilter = "";
  let incentiveFilter = "";
  let chainIdFilter = "";
  let idFilter = "";
  let notFilter = "";

  filters.forEach((filter) => {
    switch (filter.id) {
      case "input_token_id":
        if (assetFilter) assetFilter += " OR ";
        if (filter.condition === "NOT") {
          notFilter += filter.matches
            ?.map((match) => `NOT input_token_id = '${match}'::text`)
            .join(" AND ");
        } else {
          assetFilter += filter.matches
            ?.map((match) => `input_token_id = '${match}'::text`)
            .join(" OR ");
        }

        break;
      case "incentive_ids":
        if (incentiveFilter) incentiveFilter += " OR ";
        if (filter.condition === "NOT") {
          notFilter += filter.matches
            ?.map((match) => `NOT incentive_ids @> ARRAY['${match}']::text[]`)
            .join(" AND ");
        } else {
          incentiveFilter += filter.matches
            ?.map((match) => `incentive_ids @> ARRAY['${match}']::text[]`)
            .join(" OR ");
        }

        break;
      case "chain_id":
        if (chainIdFilter) chainIdFilter += " OR ";
        if (filter.condition === "NOT") {
          notFilter += `chain_id <> ${filter.value}`;
        } else {
          chainIdFilter += `chain_id = ${filter.value}`;
        }
        break;
      case "id":
        if (idFilter) idFilter += " OR ";

        idFilter += `id = '${filter.value}'`;
        break;
    }
  });

  let filterClauses = "";

  if (assetFilter) filterClauses += `(${assetFilter}) AND `;
  if (incentiveFilter) filterClauses += `(${incentiveFilter}) AND `;
  if (chainIdFilter) filterClauses += `(${chainIdFilter}) AND `;
  if (idFilter) filterClauses += `(${idFilter}) AND `;
  if (notFilter) filterClauses += `(${notFilter}) AND `;

  if (filterClauses) {
    filterClauses = filterClauses.slice(0, -5); // Remove the trailing " AND "
  }

  return filterClauses;
};

export type EnrichedMarketDataType =
  Database["public"]["CompositeTypes"]["enriched_markets_data_type"] & {
    incentive_tokens_data: Array<
      SupportedToken & {
        raw_amount: string;
        token_amount: number;
        token_amount_usd: number;
        price: number;
        fdv: number;
        total_supply: number;
        annual_change_ratio: number;
        per_input_token: number;
        token_rate: number;
      }
    >;
    input_token_data: SupportedToken & {
      raw_amount: string;
      token_amount: number;
      token_amount_usd: number;
      locked_token_amount: number;
      locked_token_amount_usd: number;
      price: number;
      fdv: number;
      total_supply: number;
    };
    chain_data: SupportedChain;
    yield_breakdown: Array<
      SupportedToken & {
        category: "base" | "underlying" | "native";
        label: string;
        annual_change_ratio: number;
        total_supply?: number;
        fdv?: number;
        price?: number;
        allocation?: number;
        token_amount?: number;
      }
    >;
  };

export const getEnrichedMarketsQueryOptions = (
  client: TypedRoycoClient,
  RPC_API_KEYS: TypedRpcApiKeys,
  chain_id: number | undefined,
  market_type: number | undefined,
  market_id: string | undefined,
  page_index: number | undefined,
  filters: Array<MarketFilter> | undefined,
  sorting: Array<BaseSortingFilter> | undefined,
  search_key: string | undefined,
  is_verified: boolean | undefined,
  custom_token_data: CustomTokenData | undefined,
) => ({
  queryKey: [
    "enriched-markets",
    {
      chain_id,
      market_type,
      market_id,
      page_index,
      filters,
      sorting,
      search_key,
      is_verified,
      custom_token_data,
    },
  ],
  queryFn: async () => {
    const filterClauses = constructMarketFilterClauses(filters);
    const sortingClauses = constructBaseSortingFilterClauses(sorting);

    const result = await client.rpc("get_enriched_markets", {
      chain_id: chain_id,
      market_type: market_type,
      market_id: market_id,
      page_index: page_index,
      filters: filterClauses,
      sorting: sortingClauses,
      search_key: search_key,
      ...(is_verified === true ? { is_verified: is_verified } : {}),
      custom_token_data: custom_token_data,
    });

    if (!!result.data && !!result.data.data && result.data.data.length > 0) {
      const rows = result.data.data;

      const new_rows = await Promise.all(
        rows.map(async (row) => {
          if (
            !!row.input_token_id &&
            !!row.incentive_ids &&
            !!row.incentive_token_price_values &&
            !!row.incentive_token_fdv_values &&
            !!row.incentive_token_total_supply_values &&
            !!row.chain_id &&
            !!row.annual_change_ratios
          ) {
            const market = getSupportedMarket(row.id);

            let native_yield = undefined;

            if (!!market && !!market.native_yield) {
              const chainClient = createPublicClient({
                chain: getSupportedChain(row.chain_id),
                transport: http(RPC_API_KEYS[row.chain_id]),
              });

              native_yield = await market.native_yield({
                roycoClient: client,
                chainClient: chainClient,
              });
            }

            const chain_data = getSupportedChain(row.chain_id);

            const input_token_info: SupportedToken = getSupportedToken(
              row.input_token_id,
            );
            const input_token_price: number = parseNumber(
              row.input_token_price,
            );
            const input_token_fdv: number = parseNumber(row.input_token_fdv);
            const input_token_total_supply: number = parseNumber(
              row.input_token_total_supply,
            );
            const input_token_raw_amount: string = parseRawAmount(
              row.quantity_ap,
            );

            const locked_input_token_raw_amount: string = parseRawAmount(
              row.locked_quantity,
            );

            const input_token_token_amount: number =
              parseRawAmountToTokenAmount(
                input_token_raw_amount,
                input_token_info.decimals,
              );

            const locked_input_token_token_amount: number =
              parseRawAmountToTokenAmount(
                locked_input_token_raw_amount,
                input_token_info.decimals,
              );

            const input_token_token_amount_usd =
              parseTokenAmountToTokenAmountUsd(
                input_token_token_amount,
                input_token_price,
              );
            const locked_input_token_token_amount_usd =
              parseTokenAmountToTokenAmountUsd(
                locked_input_token_token_amount,
                input_token_price,
              );

            const input_token_data = {
              ...input_token_info,
              raw_amount: input_token_raw_amount,
              token_amount: input_token_token_amount,
              token_amount_usd: input_token_token_amount_usd,
              locked_token_amount: locked_input_token_token_amount,
              locked_token_amount_usd: locked_input_token_token_amount_usd,
              price: input_token_price,
              fdv: input_token_fdv,
              total_supply: input_token_total_supply,
            };

            const incentive_tokens_data = row.incentive_ids.map(
              (tokenId: string, tokenIndex: number) => {
                const token_price: number = parseNumber(
                  row.incentive_token_price_values?.[tokenIndex],
                );
                const token_fdv: number = parseNumber(
                  row.incentive_token_fdv_values?.[tokenIndex],
                );
                const token_total_supply: number = parseNumber(
                  row.incentive_token_total_supply_values?.[tokenIndex],
                );

                const token_info: SupportedToken = getSupportedToken(tokenId);

                const raw_amount: string = parseRawAmount(
                  row.incentive_amounts?.[tokenIndex],
                );

                const token_amount: number = parseRawAmountToTokenAmount(
                  raw_amount,
                  token_info.decimals,
                );

                const token_amount_usd: number =
                  parseTokenAmountToTokenAmountUsd(token_amount, token_price);

                const annual_change_ratio: number = parseNumber(
                  row.annual_change_ratios?.[tokenIndex],
                );

                let per_input_token = 0;

                if (market_type === RoycoMarketType.recipe.value) {
                  // recipe
                  per_input_token =
                    token_amount / input_token_data.token_amount;
                } else {
                  // vault
                  per_input_token =
                    token_amount / input_token_data.locked_token_amount;
                }

                if (isNaN(per_input_token) || !isFinite(per_input_token))
                  per_input_token = 0;

                let token_rate = 0;

                if (market_type === RoycoMarketType.recipe.value) {
                  // Recipe Market
                  token_rate = 0;
                } else {
                  // Vault Market
                  // this rate is actually tokens per year
                  token_rate = parseRawAmountToTokenAmount(
                    row.base_incentive_rates?.[tokenIndex],
                    token_info.decimals,
                  );
                }

                return {
                  ...token_info,
                  raw_amount,
                  token_amount,
                  token_amount_usd,
                  price: token_price,
                  fdv: token_fdv,
                  total_supply: token_total_supply,
                  annual_change_ratio: annual_change_ratio,
                  per_input_token: per_input_token,
                  token_rate,
                };
              },
            );

            let yield_breakdown: Array<
              SupportedToken & {
                category: string;
                label: string;
                annual_change_ratio: number;
                total_supply?: number;
                fdv?: number;
                price?: number;
                allocation?: number;
                token_amount?: number;
              }
            > = [];

            // Base Yields
            if (
              !!row.annual_change_ratios &&
              row.annual_change_ratios.length > 0 &&
              !!row.incentive_ids &&
              row.incentive_ids.length > 0
            ) {
              for (let i = 0; i < row.annual_change_ratios.length; i++) {
                const annual_change_ratio = row.annual_change_ratios[i];
                const token_id = row.incentive_ids[i];

                let allocation = 1;

                const token_data = getSupportedToken(token_id);

                let token_amount = undefined;

                if (token_data.type === "point") {
                  const raw_amount: string = parseRawAmount(
                    row.incentive_amounts?.[i],
                  );

                  token_amount = parseRawAmountToTokenAmount(
                    raw_amount,
                    token_data.decimals,
                  );

                  const total_supply =
                    row.incentive_token_total_supply_values?.[i] ?? 0;

                  allocation = token_amount / total_supply;
                }

                if (annual_change_ratio != undefined && !!token_id) {
                  yield_breakdown.push({
                    ...getSupportedToken(token_id),
                    category: "base",
                    label: "Royco Yield",
                    annual_change_ratio: annual_change_ratio,
                    total_supply: row.incentive_token_total_supply_values?.[i],
                    fdv: row.incentive_token_fdv_values?.[i],
                    price: row.incentive_token_price_values?.[i],
                    allocation,
                    ...(token_amount ? { token_amount } : {}),
                  });
                }
              }
            }

            // Underlying Vault Yields
            if (!!row.underlying_annual_change_ratio) {
              yield_breakdown.push({
                ...getSupportedToken(row.input_token_id),
                category: "underlying",
                label: "Underlying Vault Yield",
                annual_change_ratio: row.underlying_annual_change_ratio,
              });
            }

            // Native Yields
            if (!!row.native_annual_change_ratio && !!native_yield) {
              let curr_sum = 0;

              for (
                let i = 0;
                i < native_yield.native_annual_change_ratios.length;
                i++
              ) {
                if (i === native_yield.native_annual_change_ratios.length - 1) {
                  // last index
                  yield_breakdown.push({
                    ...getSupportedToken(
                      native_yield.native_annual_change_ratios[i]?.id ?? "",
                    ),
                    category: "native",
                    label:
                      native_yield.native_annual_change_ratios[i]?.label ??
                      "Native Yield",
                    annual_change_ratio: Math.max(
                      0,
                      row.native_annual_change_ratio - curr_sum,
                    ),
                  });
                } else {
                  // not last index
                  yield_breakdown.push({
                    ...getSupportedToken(
                      native_yield.native_annual_change_ratios[i]?.id ?? "",
                    ),
                    category: "native",
                    label:
                      native_yield.native_annual_change_ratios[i]?.label ??
                      "Native Yield",
                    annual_change_ratio:
                      native_yield.native_annual_change_ratios[i]
                        ?.annual_change_ratio ?? 0,
                  });
                }

                curr_sum +=
                  native_yield.native_annual_change_ratios[i]
                    ?.annual_change_ratio ?? 0;
              }
            }

            return {
              ...row,
              incentive_tokens_data: incentive_tokens_data,
              input_token_data,
              chain_data,
              yield_breakdown,
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

// const input_token_raw_amount: string = BigNumber.from(
//   (row.quantity_ip ?? 0).toLocaleString("fullwide", {
//     useGrouping: false,
//   })
// ).toString();

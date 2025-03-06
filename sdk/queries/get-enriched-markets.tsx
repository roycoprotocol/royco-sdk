import type { TypedRoycoClient, TypedRpcApiKeys } from "@/sdk/client";
import type { BaseSortingFilter, CustomTokenData, Database } from "@/sdk/types";
import type { SupportedChain, SupportedToken } from "@/sdk/constants";

import { getSupportedMarket, getSupportedToken } from "@/sdk/constants";
import {
  constructBaseSortingFilterClauses,
  getSupportedChain,
  isSolidityAddressValid,
  parseNumber,
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { RoycoMarketType } from "@/sdk/market";

import {
  BERA_TOKEN_ID,
  calculateBeraYield,
  getAllBeraMarkets,
} from "@/sdk/boyco";
import { getTokenQuotesQueryFunction } from "./get-token-quotes";
import { id } from "ethers/lib/utils";
import { SONIC_CHAIN_ID, SONIC_ROYCO_GEM_BOOST_ID } from "../sonic";
import { calculateSonicYield, getAllSonicMarkets } from "../sonic/sonic-yield";
import { boycoLinks } from "../boyco/links";

export type MarketFilter = {
  id: string;
  value: string | number | boolean;
  matches?: Array<string>;
  condition?: string;
};

export const constructEnrichedMarketsFilterClauses = (
  filters: MarketFilter[] | undefined,
): string | undefined => {
  if (!filters) return undefined;

  let assetFilter = "";
  let incentiveFilter = "";
  let chainIdFilter = "";
  let idFilter = "";
  let notFilter = "";
  let categoryFilter = "";

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
          if (notFilter) notFilter += " AND ";
          notFilter += `chain_id <> ${filter.value}`;
        } else {
          chainIdFilter += `chain_id = ${filter.value}`;
        }
        break;
      case "category":
        if (categoryFilter) categoryFilter += " OR ";
        if (filter.condition === "NOT") {
          if (notFilter) notFilter += " AND ";
          notFilter += `NOT category = '${filter.value}'`;
        } else {
          categoryFilter += `category = '${filter.value}'::text`;
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
  if (categoryFilter) filterClauses += `(${categoryFilter}) AND `;

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
        label?: string;
        annual_change_ratio: number;
        total_supply?: number;
        fdv?: number;
        price?: number;
        allocation?: number;
        token_amount?: number;
      }
    >;
    external_incentives: Array<
      SupportedToken & {
        label?: string;
        value: string;
      }
    >;
    incentive_ids?: Array<string>;
    boyco?: {
      bera_merkle_id?: string | null;
      native_incentive_link?: string | null;
      external_incentives?: Array<{
        label: string;
        link: string;
      }> | null;
    };
  };

export type GetEnrichedMarketsQueryParams = {
  chain_id?: number;
  market_type?: number;
  market_id?: string;
  page_index?: number;
  page_size?: number;
  filters?: Array<MarketFilter>;
  sorting?: Array<BaseSortingFilter>;
  search_key?: string;
  is_verified?: boolean;
  custom_token_data?: CustomTokenData;
  category?: string;
};

export type GetEnrichedMarketsQueryOptionsParams =
  GetEnrichedMarketsQueryParams & {
    client: TypedRoycoClient;
  };

export const getEnrichedMarketsQueryFunction = async ({
  client,
  chain_id,
  market_type,
  market_id,
  page_index,
  page_size,
  filters,
  sorting,
  search_key,
  is_verified,
  custom_token_data,
  category,
}: GetEnrichedMarketsQueryOptionsParams) => {
  const filter_clauses = constructEnrichedMarketsFilterClauses(filters);
  const sorting_clauses = constructBaseSortingFilterClauses(sorting);

  let function_name: "get_enriched_markets_view" | "get_enriched_markets" =
    "get_enriched_markets_view";

  if (!!custom_token_data && custom_token_data.length !== 0) {
    let nonBeraTokens = 0;

    for (let i = 0; i < custom_token_data.length; i++) {
      if (
        !!custom_token_data[i]?.token_id &&
        isSolidityAddressValid(
          "address",
          custom_token_data[i]?.token_id.split("-")[1],
        ) &&
        custom_token_data[i]?.token_id.toLowerCase() !==
          BERA_TOKEN_ID.toLowerCase()
      ) {
        nonBeraTokens++;
        function_name = "get_enriched_markets";
        break;
      }
    }
  }

  const result = await client.rpc(function_name, {
    chain_id,
    market_type,
    market_id,
    page_index,
    page_size,
    filters: filter_clauses,
    sorting: sorting_clauses,
    search_key,
    is_verified,
    custom_token_data,
    category,
  });

  if (!!result.data && !!result.data.data && result.data.data.length > 0) {
    const rows = result.data.data;

    const new_rows = rows
      .map((row) => {
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

          const chain_data = getSupportedChain(row.chain_id);

          const input_token_info: SupportedToken = getSupportedToken(
            row.input_token_id,
          );
          const input_token_price: number = parseNumber(row.input_token_price);
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

          const input_token_token_amount: number = parseRawAmountToTokenAmount(
            input_token_raw_amount,
            input_token_info.decimals,
          );

          const locked_input_token_token_amount: number =
            parseRawAmountToTokenAmount(
              locked_input_token_raw_amount,
              input_token_info.decimals,
            );

          const input_token_token_amount_usd = parseTokenAmountToTokenAmountUsd(
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

              const token_amount_usd: number = parseTokenAmountToTokenAmountUsd(
                token_amount,
                token_price,
              );

              const annual_change_ratio: number = parseNumber(
                row.annual_change_ratios?.[tokenIndex],
              );

              let per_input_token = 0;

              if (market_type === RoycoMarketType.recipe.value) {
                // recipe
                per_input_token = token_amount / input_token_data.token_amount;
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

              const raw_amount: string = parseRawAmount(
                row.incentive_amounts?.[i],
              );

              let token_amount = parseRawAmountToTokenAmount(
                raw_amount,
                token_data.decimals,
              );

              const total_supply =
                row.incentive_token_total_supply_values?.[i] ?? 0;

              if (total_supply !== 0) {
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
                  token_amount,
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
          if (!!row.native_annual_change_ratio && !!market?.native_yield) {
            for (let i = 0; i < market.native_yield.length; i++) {
              const nativeYield = market.native_yield[i];
              if (!nativeYield) continue;

              const annual_change_ratio =
                row.native_annual_change_ratios?.[i] ?? 0;

              yield_breakdown.push({
                ...getSupportedToken(nativeYield.token_id),
                category: "native",
                label: nativeYield.label ?? "Native Yield",
                annual_change_ratio,
              });
            }
          }

          let external_incentives: Array<
            SupportedToken & {
              label: string;
              value: string;
            }
          > = [];

          // External Incentives
          if (!!market?.external_incentives) {
            for (let i = 0; i < market.external_incentives.length; i++) {
              const externalIncentive = market.external_incentives[i];
              if (!externalIncentive) continue;

              const value = row.external_incentive_values?.[i] ?? "0";

              external_incentives.push({
                ...getSupportedToken(externalIncentive.token_id),
                label: externalIncentive.label ?? "External Yield",
                value,
              });
            }
          }

          return {
            ...row,
            incentive_tokens_data: incentive_tokens_data,
            input_token_data,
            chain_data,
            yield_breakdown,
            external_incentives,
            incentive_ids: market?.incentive_ids,
          };
        }

        return null;
      })
      .filter((row) => !!row);

    return {
      count: result.data.count ?? 0,
      data: new_rows as Array<EnrichedMarketDataType> | null,
    };
  }

  return {
    count: 0,
    data: null as Array<EnrichedMarketDataType> | null,
  };
};

export const getEnrichedMarketsWithBeraYield = async ({
  client,
  chain_id,
  market_type,
  market_id,
  page_index,
  page_size,
  filters,
  sorting,
  search_key,
  is_verified,
  custom_token_data,
}: GetEnrichedMarketsQueryOptionsParams) => {
  const [allBeraMarkets, allSonicMarkets, result, beraQuote] =
    await Promise.all([
      getAllBeraMarkets({
        client,
        customTokenData: custom_token_data ?? [],
      }),
      getAllSonicMarkets({
        client,
        customTokenData: custom_token_data ?? [],
      }),
      getEnrichedMarketsQueryFunction({
        client,
        chain_id,
        market_type,
        market_id,
        page_index,
        page_size,
        filters,
        sorting,
        search_key,
        is_verified,
        custom_token_data,
      }),
      getTokenQuotesQueryFunction({
        client,
        token_ids: [BERA_TOKEN_ID],
      }),
    ]);

  let currentBeraQuote = undefined;

  if (!!beraQuote && !!beraQuote[0]) {
    currentBeraQuote = [
      {
        token_id: BERA_TOKEN_ID,
        price: beraQuote[0].price.toString(),
        total_supply: beraQuote[0].total_supply.toString(),
        fdv: beraQuote[0].fdv.toString(),
      },
    ];
  }

  if (!!result.data && !!allBeraMarkets) {
    // Bera Yield
    const bera_yield_rows = result.data.map((row) => {
      if (row.category === "boyco") {
        const bera_annual_change_ratio = calculateBeraYield({
          enrichedMarket: row as EnrichedMarketDataType,
          customTokenData: [
            ...(custom_token_data ?? []),
            ...(currentBeraQuote ?? []),
          ],
          markets: allBeraMarkets,
        });

        const yield_breakdown = [
          ...row.yield_breakdown,
          {
            ...getSupportedToken(BERA_TOKEN_ID),
            category: "native",
            label: "Bera Yield",
            annual_change_ratio: bera_annual_change_ratio,
          },
        ];

        const annual_change_ratio =
          (row.annual_change_ratio || 0) + bera_annual_change_ratio;

        let boyco = null;

        if (!!row && row.market_id) {
          boyco = {
            native_incentive_link: boycoLinks["native"][row.market_id],
            bera_merkle_id: boycoLinks["merkle"][row.market_id],
            external_incentives: boycoLinks["external"][row.market_id],
          };
        }

        return {
          ...row,
          yield_breakdown,
          annual_change_ratio,
          boyco,
        };
      } else if (row.chain_id === SONIC_CHAIN_ID) {
        const sonic_gem_boost_annual_change_ratio = calculateSonicYield({
          enrichedMarket: row as EnrichedMarketDataType,
          customTokenData: [...(custom_token_data ?? [])],
          markets: allSonicMarkets,
        });

        const yield_breakdown = [
          ...row.yield_breakdown,
          {
            ...getSupportedToken(SONIC_ROYCO_GEM_BOOST_ID),
            category: "native",
            label: "Gem Boost",
            annual_change_ratio: sonic_gem_boost_annual_change_ratio,
          },
        ];

        const annual_change_ratio =
          (row.annual_change_ratio || 0) + sonic_gem_boost_annual_change_ratio;

        return {
          ...row,
          yield_breakdown,
          annual_change_ratio,
        };
      } else {
        return row;
      }
    });

    return {
      count: result.count ?? 0,
      data: bera_yield_rows as Array<EnrichedMarketDataType> | null,
    };
  }

  return {
    count: 0,
    data: null as Array<EnrichedMarketDataType> | null,
  };
};

export const getEnrichedMarketsQueryOptions = ({
  client,
  chain_id,
  market_type,
  market_id,
  page_index,
  page_size,
  filters,
  sorting,
  search_key,
  is_verified,
  custom_token_data,
}: GetEnrichedMarketsQueryOptionsParams) => ({
  queryKey: [
    "get-enriched-markets",
    {
      chain_id,
      market_type,
      market_id,
      page_index,
      page_size,
      filters,
      sorting,
      search_key,
      is_verified,
      custom_token_data,
    },
  ],
  queryFn: () =>
    getEnrichedMarketsWithBeraYield({
      client,
      chain_id,
      market_type,
      market_id,
      page_index,
      page_size,
      filters,
      sorting,
      search_key,
      is_verified,
      custom_token_data,
    }),

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 10, // 10 mins
  refetchOnWindowFocus: false,
});

// const input_token_raw_amount: string = BigNumber.from(
//   (row.quantity_ip ?? 0).toLocaleString("fullwide", {
//     useGrouping: false,
//   })
// ).toString();

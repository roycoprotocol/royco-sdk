import { type TypedRoycoClient } from "@/sdk/client";
import { type SortingState } from "@tanstack/react-table";
import type { Tables } from "@/sdk/types";

export const poolsPerPage = 30;

export type Pools = Array<Tables<"pools">>;

export type TypedPool = {
  id: string;
  chain_id: number;
  assets: Array<string>;
  incentives: Array<string>;
  name: string;
  tvl: number;
  apy: number;
  rewards: number;
  affiliate_fee: number;
  description: string;
  action: string;
  filled: number;
  is_active: boolean;
};

export type PoolFilter = {
  id: string;
  value: string | number | boolean;
  matches?: Array<string>;
};

export const getPoolsQueryOptions = (
  client: TypedRoycoClient,
  sorting: SortingState,
  filters: PoolFilter[] = [],
  searchKey?: string,
  pageIndex: number = 0,
) => ({
  queryKey: [
    "pools",
    `search=${searchKey}`,
    ...sorting.map((sort) => `sort=${sort.id}:${sort.desc}`),
    ...filters.map((filter) => `filter=${filter.id}:${filter.value}`),
    `page=${pageIndex}`,
  ],
  queryFn: async () => {
    let query = client.from("pools").select("*", { count: "exact" });

    if (searchKey) {
      query = query.textSearch("name", `${searchKey} `);
    }

    if (sorting.length !== 0) {
      sorting.forEach((sort) => {
        query = query.order(sort.id, { ascending: sort.desc ? false : true });
      });
    }

    let assetFilters: string[] = [];
    let incentiveFilters: string[] = [];
    let chainFilters: string[] = [];

    for (let i = 0; i < filters.length; i++) {
      if (filters[i]?.id === "asset") {
        const currentAssetFilters = filters[i]?.matches?.map(
          (match) => `assets.cs.{${match}}`,
        );

        if (!!currentAssetFilters) assetFilters.push(...currentAssetFilters);
      } else if (filters[i]?.id === "incentive") {
        const currentIncentiveFilters = filters[i]?.matches
          ?.map((match) => `incentives.cs.{${match}}`)
          .join(",");

        if (!!currentIncentiveFilters)
          incentiveFilters.push(currentIncentiveFilters);
      } else if (filters[i]?.id === "chain_id") {
        const currentChainFilter = `chain_id.eq.${filters[i]?.value}`;

        if (!!currentChainFilter) chainFilters.push(currentChainFilter);
      }
    }

    if (assetFilters.length > 0) {
      query = query.or(assetFilters.join(","));
    }

    if (incentiveFilters.length > 0) {
      query = query.or(incentiveFilters.join(","));
    }

    if (chainFilters.length > 0) {
      query = query.or(chainFilters.join(","));
    }

    const from = pageIndex * poolsPerPage;
    const to = from + poolsPerPage;

    query = query.range(from, to);

    return query
      .throwOnError()
      .then((result) => ({ data: result.data, count: result.count }));
  },
  keepPreviousData: true,
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 minute
});

import { useQuery } from "@tanstack/react-query";
import {
  getPoolInfoQueryOptions,
  getPoolsQueryOptions,
  getPoolStatsQueryOptions,
  getTokenInfoQueryOptions,
  PoolFilter,
  poolsPerPage,
} from "@/sdk/queries";
import { SortingState } from "@tanstack/react-table";
import { useRoycoClient, type RoycoClient } from "@/sdk/client";

import type { Pools, PoolStats, PoolInfo, TokenInfo } from "@/sdk/queries";

import { useQueries } from "@tanstack/react-query";

export type PoolTableRow = {
  id: string;
  chain_id: number;
  name: string | null;
  assets: Array<TokenInfo>;
  affiliate_fee: number;
  description: string | null;
  action: string | null;
  timelock: string;
  incentive: string;
  apy: number;
  rewards: number;
  tvl: number;
};

export type TypedPoolTableData = Array<PoolTableRow>;
export type PoolTableData = Array<PoolTableRow> | null;

export const usePoolTable = (
  page: number = 0,
  sorting: SortingState,
  filters: PoolFilter[]
) => {
  const client: RoycoClient = useRoycoClient();

  const {
    data: pools,
    isLoading: isLoadingPools,
    isError: isErrorPools,
    isSuccess: isSuccessPools,
    isRefetching: isRefetchingPools,
  } = useQuery(getPoolsQueryOptions(client, page, sorting, filters));

  const poolStatsQueries = useQueries({
    queries: pools
      ? (pools.data as Pools).map((pool) => ({
          ...getPoolStatsQueryOptions(client, pool.id),
          enabled: !!pools,
        }))
      : [],
  });

  const poolInfoQueries = useQueries({
    queries: pools
      ? (pools.data as Pools).map((pool) => ({
          ...getPoolInfoQueryOptions(client, pool.id),
          enabled: !!pools,
        }))
      : [],
  });

  const tokenInfoQueries = useQueries({
    queries:
      poolInfoQueries &&
      poolInfoQueries.some((query) => query.isLoading) === false &&
      poolInfoQueries.length > 0
        ? poolInfoQueries
            .map((poolInfoQuery) =>
              !!poolInfoQuery &&
              "data" in poolInfoQuery &&
              poolInfoQuery.data !== null
                ? (poolInfoQuery.data as PoolInfo).assets.map((asset) => ({
                    ...getTokenInfoQueryOptions(client, asset),

                    enabled:
                      poolInfoQuery.isSuccess &&
                      !!poolInfoQuery.data &&
                      (poolInfoQuery.data as PoolInfo).assets.length > 0,
                  }))
                : []
            )
            .flat()
        : [],
  });

  const isLoading =
    isLoadingPools ||
    poolStatsQueries.some((query) => query.isLoading) ||
    poolInfoQueries.some((query) => query.isLoading) ||
    tokenInfoQueries.some((query) => query.isLoading);

  const isError =
    isErrorPools ||
    poolStatsQueries.some((query) => query.isError) ||
    poolInfoQueries.some((query) => query.isError) ||
    tokenInfoQueries.some((query) => query.isError);

  const isRefetching =
    isRefetchingPools ||
    poolStatsQueries.some((query) => query.isRefetching) ||
    poolInfoQueries.some((query) => query.isRefetching) ||
    tokenInfoQueries.some((query) => query.isRefetching);

  let data: PoolTableData = null;
  let count: number = 0;

  if (
    isLoading === false &&
    !!pools &&
    !!pools.data &&
    !!poolStatsQueries &&
    !!poolInfoQueries &&
    !!tokenInfoQueries
  ) {
    data = pools.data.map((pool, index) => ({
      ...pool,
      ...(poolStatsQueries[index].data as PoolStats),
      ...(poolInfoQueries[index].data as PoolInfo),
      assets: (poolInfoQueries[index].data as PoolInfo).assets.map(
        (asset: string) =>
          tokenInfoQueries.find(
            (tokenQuery) =>
              (
                tokenQuery.data as {
                  id: string;
                }
              ).id === asset
          )?.data as TokenInfo
      ),
    }));

    count = pools && pools.count ? pools.count : 0;
  }

  return {
    isLoading,
    isError,
    data,
    count,
    totalPages: Math.ceil(count / poolsPerPage),
    isRefetching,
  };
};

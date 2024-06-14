import { useQuery } from "@tanstack/react-query";
import { getPoolsQueryOptions, PoolFilter } from "@/sdk/queries";
import { SortingState } from "@tanstack/react-table";
import { useRoycoClient, type RoycoClient } from "@/sdk/client";

import type { TypedPool } from "@/sdk/queries";

import {
  useDistinctAssets,
  useDistinctChains,
  useDistinctIncentives,
} from "@/sdk/hooks";

export const usePoolTable = ({
  sorting,
  filters,
  searchKey,
  pageIndex = 0,
}: {
  sorting: SortingState;
  filters: PoolFilter[];
  searchKey?: string;
  pageIndex?: number;
}) => {
  const client: RoycoClient = useRoycoClient();

  const {
    data: rawPools,
    isLoading: isLoadingPools,
    isError: isErrorPools,
    isRefetching: isRefetchingPools,
  } = useQuery(
    getPoolsQueryOptions(client, sorting, filters, searchKey, pageIndex)
  );

  const {
    data: distinctAssets,
    isLoading: isLoadingAssets,
    isError: isErrorAssets,
    isRefetching: isRefetchingAssets,
  } = useDistinctAssets({ output: "object" });

  const {
    data: distinctIncentives,
    isLoading: isLoadingIncentives,
    isError: isErrorIncentives,
    isRefetching: isRefetchingIncentives,
  } = useDistinctIncentives({ output: "object" });

  const {
    data: distinctChains,
    isLoading: isLoadingChains,
    isError: isErrorChains,
    isRefetching: isRefetchingChains,
  } = useDistinctChains();

  const isLoading =
    isLoadingPools || isLoadingAssets || isLoadingIncentives || isLoadingChains;

  const isError =
    isErrorPools || isErrorAssets || isErrorIncentives || isErrorChains;

  const isRefetching =
    isRefetchingPools ||
    isRefetchingAssets ||
    isRefetchingIncentives ||
    isRefetchingChains;

  let data = null;
  let count: number = 0;

  if (
    isLoading === false &&
    !!rawPools &&
    !!distinctAssets &&
    !!distinctIncentives &&
    !!distinctChains
  ) {
    data =
      rawPools && rawPools.data
        ? // @ts-ignore
          (rawPools.data as TypedPool[]).map((pool, index) => ({
            ...pool,
            incentivesInfo: pool.incentives.map(
              // @ts-ignore
              (incentive: string) => distinctIncentives[incentive]
            ),
            assetsInfo: pool.assets.map(
              // @ts-ignore
              (asset: string) => distinctAssets[asset] || null
            ),
            chain: distinctChains[pool.chain_id] || null,
          }))
        : null;
  }

  if (rawPools && rawPools.count) {
    count = rawPools.count;
  }

  return { data, isLoading, isError, isRefetching, count };
};

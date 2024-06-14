import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getPoolQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";

import {
  useDistinctAssets,
  useDistinctChains,
  useDistinctIncentives,
} from "@/sdk/hooks";

export const usePool = ({ id }: { id: string | null }) => {
  const client: RoycoClient = useRoycoClient();

  const {
    data: pool,
    isLoading: isLoadingPool,
    isError: isErrorPool,
    isRefetching: isRefetchingPool,
  } = useQuery(getPoolQueryOptions(client, id));

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

  let data = null;

  const isLoading =
    isLoadingPool || isLoadingAssets || isLoadingIncentives || isLoadingChains;

  const isError =
    isErrorPool || isErrorAssets || isErrorIncentives || isErrorChains;

  const isRefetching =
    isRefetchingPool ||
    isRefetchingAssets ||
    isRefetchingIncentives ||
    isRefetchingChains;

  if (
    isLoadingPool === false &&
    !!distinctAssets &&
    !!distinctIncentives &&
    !!distinctChains &&
    !!pool
  ) {
    data = {
      ...pool,
      // @ts-ignore
      incentivesInfo: pool.incentives.map(
        // @ts-ignore
        (incentive: string) => distinctIncentives[incentive]
      ),
      // @ts-ignore
      assetsInfo: pool.assets.map(
        // @ts-ignore
        (asset: string) => distinctAssets[asset] || null
      ),
      // @ts-ignore
      chain: distinctChains[pool.chain_id] || null,
    };
  }

  return { data, isLoading, isError, isRefetching };
};

import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getChainInfoQueryOptions,
  getDistinctAssetsQueryOptions,
  getDistinctChainsQueryOptions,
  getDistinctIncentivesQueryOptions,
  getTokenInfoQueryOptions,
} from "@/sdk/queries";

import type {
  ChainInfo,
  DistinctAssets,
  DistinctChains,
  DistinctIncentives,
  TokenInfo,
} from "@/sdk/queries";

import { useRoycoClient, type RoycoClient } from "@/sdk/client";

export type TypedFilterMenuData = {
  assets: Array<TokenInfo>;
  incentives: Array<TokenInfo>;
  chains: Array<ChainInfo>;
};

export type FilterMenuData = TypedFilterMenuData | null;

export const useFilterMenu = () => {
  const client: RoycoClient = useRoycoClient();

  const {
    data: assets,
    isLoading: isLoadingAssets,
    isError: isErrorsAssets,
  } = useQuery(getDistinctAssetsQueryOptions(client));

  const assetsInfoQueries = useQueries({
    queries: assets
      ? (assets as DistinctAssets).map((asset) => ({
          ...getTokenInfoQueryOptions(client, asset.id),
          enabled: !!assets,
        }))
      : [],
  });

  const {
    data: incentives,
    isLoading: isLoadingIncentives,
    isError: isErrorIncentives,
  } = useQuery(getDistinctIncentivesQueryOptions(client));

  const incentivesInfoQueries = useQueries({
    queries: incentives
      ? (incentives as DistinctIncentives).map((incentive) => ({
          ...getTokenInfoQueryOptions(client, incentive.id),
          enabled: !!incentives,
        }))
      : [],
  });

  const {
    data: chains,
    isLoading: isLoadingChains,
    isError: isErrorChains,
  } = useQuery(getDistinctChainsQueryOptions(client));

  const chainsInfoQueries = useQueries({
    queries: chains
      ? (chains as DistinctChains).map((chain) => ({
          ...getChainInfoQueryOptions(client, chain.id),
          enabled: !!chains,
        }))
      : [],
  });

  const isLoading =
    isLoadingAssets ||
    isLoadingIncentives ||
    isLoadingChains ||
    assetsInfoQueries.some((query) => query.isLoading) ||
    incentivesInfoQueries.some((query) => query.isLoading) ||
    chainsInfoQueries.some((query) => query.isLoading);
  const isError =
    isErrorsAssets ||
    isErrorIncentives ||
    isErrorChains ||
    assetsInfoQueries.some((query) => query.isError) ||
    incentivesInfoQueries.some((query) => query.isError) ||
    chainsInfoQueries.some((query) => query.isError);

  let data: FilterMenuData = null;

  if (!!assets && !!incentives && !!chains) {
    data = {
      assets: (assets as DistinctAssets).map(
        (asset, index) => assetsInfoQueries[index].data
      ) as Array<TokenInfo>,
      incentives: (incentives as DistinctIncentives).map(
        (incentive, index) => incentivesInfoQueries[index].data
      ) as Array<TokenInfo>,
      chains: (chains as DistinctChains).map(
        (chain, index) => chainsInfoQueries[index].data
      ) as Array<ChainInfo>,
    };
  }

  return {
    isLoading,
    isError,
    data,
  };
};

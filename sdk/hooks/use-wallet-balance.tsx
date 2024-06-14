import { getPoolQueryOptions, getTokenInfoQueryOptions } from "@/sdk/queries";
import { getTokenBalanceQueryOptions } from "@/sdk/queries";
import { getTokenPriceQueryOptions } from "@/sdk/queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Address, formatUnits } from "viem";
import { TypedRoycoClient } from "@/sdk/client";

export const useWalletBalance = (
  client: TypedRoycoClient,
  chain_id: number,
  pool_address: Address,
  user_address: Address
) => {
  const {
    data: pool,
    isLoading: isPoolLoading,
    isError: isPoolError,
  } = useQuery(getPoolQueryOptions(client, `${chain_id}${pool_address}`));

  const assets =
    !!pool && !!pool.assets
      ? [...pool.assets, ...(pool.incentive ? [pool.incentive] : [])]
      : [];

  const tokenInfoQueries = useQueries({
    queries:
      assets.map((assetId) => getTokenInfoQueryOptions(client, assetId)) || [],
  });

  const priceQueries = useQueries({
    queries:
      assets.map((assetId) => getTokenPriceQueryOptions(client, assetId)) || [],
  });

  const balanceQueries = useQueries({
    queries:
      assets.map((assetId) => {
        const token_address =
          `${assetId.slice(assetId.length - 42, assetId.length)}` as Address;

        return getTokenBalanceQueryOptions(
          chain_id,
          token_address,
          user_address
        );
      }) || [],
  });

  // console.log("balanceQueries", balanceQueries);
  // console.log("priceQueries", priceQueries);
  // console.log("tokenInfoQueries", tokenInfoQueries);

  const isLoading =
    isPoolLoading ||
    tokenInfoQueries.some((query) => query.isLoading) ||
    priceQueries.some((query) => query.isLoading) ||
    balanceQueries.some((query) => query.isLoading);

  const isError =
    isPoolError ||
    tokenInfoQueries.some((query) => query.isError) ||
    priceQueries.some((query) => query.isError) ||
    balanceQueries.some((query) => query.isError);

  let data: any = [];

  if (!isLoading && !isError) {
    data = assets.map((assetId, index) => {
      const tokenInfo = tokenInfoQueries[index]?.data;
      const price = priceQueries[index]?.data?.current_price;
      const balance = balanceQueries[index]?.data;

      if (tokenInfo && price && balance) {
        const value_token = parseFloat(
          formatUnits(balance, tokenInfo.decimals)
        );
        const value_usd = value_token * price;

        return {
          id: assetId,
          symbol: tokenInfo.symbol,
          image: tokenInfo.image,
          decimals: tokenInfo.decimals,
          value_token,
          value_usd,
        };
      } else {
        return {
          id: assetId,
          symbol: "",
          image: "",
          decimals: 0,
          value_token: 0,
          value_usd: 0,
        };
      }
    });
  }

  return {
    isLoading,
    isError,
    data,
  };
};

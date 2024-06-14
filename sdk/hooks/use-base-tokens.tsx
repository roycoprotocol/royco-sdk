import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { type BaseTokens, getBaseTokensQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";
import type { Tables } from "@/sdk/types";

export type ModifiedBaseToken = Pick<
  Tables<"tokens">,
  "id" | "chain_id" | "contract_address" | "symbol" | "image"
>;

export const useBaseTokens = () => {
  const client: RoycoClient = useRoycoClient();

  const {
    data: baseTokens,
    isLoading: isLoadingBaseTokens,
    isError: isErrorBaseTokens,
    isRefetching: isRefetchingBaseTokens,
  } = useQuery(getBaseTokensQueryOptions(client));

  let data: Array<ModifiedBaseToken> | null = null;

  const isLoading = isLoadingBaseTokens;
  const isError = isErrorBaseTokens;
  const isRefetching = isRefetchingBaseTokens;

  if (
    !isLoadingBaseTokens &&
    !isErrorBaseTokens &&
    !isRefetchingBaseTokens &&
    baseTokens
  ) {
    data = baseTokens.reduce((acc, { symbol, ids, image }) => {
      // @ts-ignore
      ids.forEach((id) => {
        const [chain_id, contract_address] = id.split("-");
        // @ts-ignore
        acc.push({
          id,
          symbol,
          image,
          chain_id: parseInt(chain_id),
          contract_address,
        } as ModifiedBaseToken);
      });
      return acc;
    }, []);
  }

  return { data, isLoading, isError, isRefetching };
};

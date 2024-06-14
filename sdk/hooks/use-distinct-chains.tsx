import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getDistinctChainsQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";

export type TypedDistinctChain = {
  id: string;
  image: string;
  symbol: string;
};

export const useDistinctChains = () => {
  const client: RoycoClient = useRoycoClient();

  const { data, isLoading, isError, isRefetching } = useQuery({
    ...getDistinctChainsQueryOptions(client),
    select: (data) =>
      data
        ? // @ts-ignore
          (data as TypedDistinctChain[]).reduce<
            Record<string, TypedDistinctChain>
          >((acc, item) => {
            acc[item.id] = {
              id: item.id,
              image: item.image,
              symbol: item.symbol,
            };
            return acc;
          }, {})
        : null,
  });

  return { data, isLoading, isError, isRefetching };
};

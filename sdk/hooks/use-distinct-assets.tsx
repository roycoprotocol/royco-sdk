import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getDistinctAssetsQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";
import { getSupportedToken } from "../constants";

export type TypedArrayDistinctAsset = {
  ids: Array<string>;
  image: string;
  symbol: string;
};

export type TypedObjectDistinctAsset = {
  id: string;
  image: string;
  symbol: string;
  chain_id: number;
  contract_address: string;
};

export const useDistinctAssets = ({
  output = "array",
}: {
  output?: "array" | "object";
} = {}) => {
  const client: RoycoClient = useRoycoClient();

  const { data, isLoading, isError, isRefetching, error } = useQuery({
    ...getDistinctAssetsQueryOptions(client),
    select: (data) => {
      if (output === "array") {
        const new_data = data?.map((element) => {
          const baseId = element.ids[0];

          return {
            ...element,
            ...getSupportedToken(baseId),
          };
        });

        return new_data;
      } else if (output === "object") {
        return data
          ? (data as TypedArrayDistinctAsset[]).reduce<
              Record<string, TypedObjectDistinctAsset>
            >((acc, { ids, symbol }) => {
              ids.forEach((id) => {
                acc[id] = {
                  ...getSupportedToken(id),
                };
              });
              return acc;
            }, {})
          : null;
      } else {
        return null;
      }
    },
  });

  return { data, isLoading, isError, isRefetching };
};

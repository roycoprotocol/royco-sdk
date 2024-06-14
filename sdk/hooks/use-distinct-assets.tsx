import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getDistinctAssetsQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";

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

  const { data, isLoading, isError, isRefetching } = useQuery({
    ...getDistinctAssetsQueryOptions(client),
    select: (data) => {
      if (output === "array") {
        return data as TypedArrayDistinctAsset[] | null;
      } else if (output === "object") {
        return data
          ? (data as TypedArrayDistinctAsset[]).reduce<
              Record<string, TypedObjectDistinctAsset>
            >((acc, { ids, image, symbol }) => {
              ids.forEach((id) => {
                const [chain_id, contract_address] = id.split("-");
                acc[id] = {
                  id,
                  image,
                  symbol,
                  chain_id: parseInt(chain_id, 10),
                  contract_address,
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

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

export const useDistinctAssets = () => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getDistinctAssetsQueryOptions(client),
    select: (data) => {
      if (data === undefined || data === null) {
        return null;
      } else {
        let new_data = [];

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          if (
            !!element &&
            element.ids !== undefined &&
            element.ids !== null &&
            element.ids.length > 0
          ) {
            const baseId = element.ids[0];

            new_data.push({
              ...element,
              ...getSupportedToken(baseId),
            });
          }
        }

        return new_data;
      }
    },
  });
};

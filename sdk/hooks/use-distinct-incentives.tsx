import { useQuery } from "@tanstack/react-query";
import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getDistinctIncentivesQueryOptions } from "@/sdk/queries";
import { getSupportedToken } from "../constants";

export type TypedArrayDistinctIncentive = {
  ids: Array<string>;
  image: string;
  symbol: string;
};

export type TypedObjectDistinctIncentive = {
  id: string;
  image: string;
  symbol: string;
  chain_id: number;
  contract_address: string;
};

export const useDistinctIncentives = ({
  output = "array",
}: {
  output?: "array" | "object";
})  => {
  const client: RoycoClient = useRoycoClient();

  const { data, isLoading, isError, isRefetching } = useQuery({
    ...getDistinctIncentivesQueryOptions(client),
    select: (data) => {
      if (output === "array") {
        const new_data = data?.map((element) => {
          const baseId = element.ids?.[0];

          return {
            ...element,
            ...getSupportedToken(baseId),
          };
        });

        return new_data;
      } else if (output === "object") {
        return data
          ? (data as TypedArrayDistinctIncentive[]).reduce<
              Record<string, TypedObjectDistinctIncentive>
            >((acc, { ids }) => {
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

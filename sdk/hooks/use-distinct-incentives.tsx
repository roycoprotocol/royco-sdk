import { useQuery } from "@tanstack/react-query";
import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getDistinctIncentivesQueryOptions } from "@/sdk/queries";

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
} = {}) => {
  const client: RoycoClient = useRoycoClient();

  const { data, isLoading, isError, isRefetching } = useQuery({
    ...getDistinctIncentivesQueryOptions(client),
    select: (data) => {
      if (output === "array") {
        return data as TypedArrayDistinctIncentive[] | null;
      } else if (output === "object") {
        return data
          ? (data as TypedArrayDistinctIncentive[]).reduce<
              Record<string, TypedObjectDistinctIncentive>
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

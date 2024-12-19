import { useQuery } from "@tanstack/react-query";
import { getEnrichedPointProgramQueryOptions } from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export const useEnrichedPointProgram = ({
  chain_id,
  contract_address,
}: {
  chain_id: number;
  contract_address: string;
}) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery(
    getEnrichedPointProgramQueryOptions({
      client,
      chain_id,
      contract_address,
    }),
  );
};

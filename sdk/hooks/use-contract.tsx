import { useQuery } from "@tanstack/react-query";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";
import { getContractsQueryOptions } from "@/sdk/queries";

export const useContract = ({
  chain_id,
  contract_address,
}: {
  chain_id: number;
  contract_address: string;
}) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery(
    getContractsQueryOptions(client, [{ chain_id, contract_address }])
  );
};

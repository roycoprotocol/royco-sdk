import { useQuery } from "@tanstack/react-query";
import { getEnrichedPointBalanceQueryOptions } from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export const useEnrichedPointBalance = ({
  chain_id,
  contract_address,
  account_address,
}: {
  chain_id: number;
  contract_address: string;
  account_address: string;
}) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery(
    getEnrichedPointBalanceQueryOptions({
      client,
      chain_id,
      contract_address,
      account_address,
    }),
  );
};

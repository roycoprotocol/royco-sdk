import { useQuery } from "@tanstack/react-query";
import { useRpcApiKeys, type RoycoClient, useRoycoClient } from "@/sdk/client";
import { getPortfolioStatsQueryOptions } from "../queries/get-portfolio-stats";

export const usePortfolioStats = ({
  account_address,
  chain_id,
  enabled = true,
}: {
  account_address: string;
  chain_id?: number;
  enabled?: boolean;
}) => {
  const client: RoycoClient = useRoycoClient();
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getPortfolioStatsQueryOptions(
      client,
      RPC_API_KEYS ?? {},
      account_address,
      chain_id,
    ),
    enabled,
  });
};

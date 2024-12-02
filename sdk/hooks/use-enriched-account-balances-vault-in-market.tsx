import { useQuery } from "@tanstack/react-query";
import { getEnrichedAccountBalancesVaultInMarketQueryOptions } from "@/sdk/queries";
import {
  type RoycoClient,
  type TypedRpcApiKeys,
  useRoycoClient,
  useRpcApiKeys,
} from "@/sdk/client";
import type { CustomTokenData } from "@/sdk/types";

export const useEnrichedAccountBalancesVaultInMarket = ({
  chain_id,
  market_id,
  account_address,
  custom_token_data,
  enabled = true,
}: {
  chain_id: number;
  market_id: string;
  account_address: string;
  custom_token_data?: CustomTokenData;
  enabled?: boolean;
}) => {
  const client: RoycoClient = useRoycoClient();

  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getEnrichedAccountBalancesVaultInMarketQueryOptions(
      client,
      RPC_API_KEYS ?? {},
      chain_id,
      market_id,
      account_address,
      custom_token_data,
    ),
    enabled,
  });
};

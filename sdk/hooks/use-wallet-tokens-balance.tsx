import { useQuery } from "@tanstack/react-query";
import {
  type GetWalletTokensBalanceQueryParams,
  getWalletTokensBalanceQueryOptions,
} from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export type UseWalletTokensBalanceParams = GetWalletTokensBalanceQueryParams & {
  enabled?: boolean;
};

export const useWalletTokensBalance = ({
  chain_id,
  token_addresses,
  account_address,
  enabled = true,
}: UseWalletTokensBalanceParams) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getWalletTokensBalanceQueryOptions({
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      token_addresses,
      account_address,
    }),
    enabled,
  });
};

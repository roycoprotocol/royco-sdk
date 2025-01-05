import { useQuery } from "@tanstack/react-query";
import {
  type GetWalletTokenBalanceQueryParams,
  getWalletTokenBalanceQueryOptions,
} from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export type UseWalletTokenBalanceParams = GetWalletTokenBalanceQueryParams & {
  enabled?: boolean;
};

export const useWalletTokenBalance = ({
  chain_id,
  token_address,
  account_address,
  enabled = true,
}: UseWalletTokenBalanceParams) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getWalletTokenBalanceQueryOptions({
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      token_address,
      account_address,
    }),
    enabled,
  });
};

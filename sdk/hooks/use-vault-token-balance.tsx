import { useQuery } from "@tanstack/react-query";
import {
  type GetVaultTokenBalanceQueryParams,
  getVaultTokenBalanceQueryOptions,
} from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export type UseVaultTokenBalanceParams = GetVaultTokenBalanceQueryParams & {
  enabled?: boolean;
};

export const useVaultTokenBalance = ({
  chain_id,
  vault_address,
  account_address,
  enabled = true,
}: UseVaultTokenBalanceParams) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getVaultTokenBalanceQueryOptions({
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      vault_address,
      account_address,
    }),
    enabled,
  });
};

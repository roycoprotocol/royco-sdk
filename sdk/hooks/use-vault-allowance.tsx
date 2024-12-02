import { useQuery } from "@tanstack/react-query";
import { getVaultAllowanceQueryOptions } from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export const useVaultAllowance = ({
  chain_id,
  account,
  vault_address,
  spender,
  enabled = true,
}: {
  chain_id: number;
  account: string;
  vault_address: string;
  spender: string;
  enabled?: boolean;
}) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getVaultAllowanceQueryOptions(
      RPC_API_KEYS ?? {},
      chain_id,
      account,
      vault_address,
      spender,
    ),
    enabled,
  });
};

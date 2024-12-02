import { useQuery } from "@tanstack/react-query";
import { getVaultBalanceQueryOptions } from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export const useVaultBalance = ({
  chain_id,
  account,
  vault_address,
}: {
  chain_id: number;
  account: string;
  vault_address: string;
}) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery(
    getVaultBalanceQueryOptions(
      RPC_API_KEYS ?? {},
      chain_id,
      account,
      vault_address,
    ),
  );
};

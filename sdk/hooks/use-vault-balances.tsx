import { useQuery } from "@tanstack/react-query";
import { getVaultBalanceQueryOptions } from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export const useVaultBalances = ({
  account,
  vaults,
}: {
  account: string;
  vaults: {
    chain_id: number;
    vault_address: string;
  }[];
}) => {
  const RPC_API_KEYS = useRpcApiKeys();

  const queries = vaults.map((vault) =>
    getVaultBalanceQueryOptions(
      RPC_API_KEYS ?? {},
      vault.chain_id,
      account,
      vault.vault_address,
    ),
  );
  return useQuery({
    queryKey: ["vault-balances", account, vaults],
    queryFn: () => Promise.all(queries.map((query) => query.queryFn())),
    enabled: vaults.length > 0,
  });
};

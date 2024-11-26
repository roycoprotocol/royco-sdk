import type { Address } from "viem";

import { useQuery } from "@tanstack/react-query";
import { getAccountAllowanceQueryOptions } from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export const useTokenAllowance = ({
  chain_id,
  account,
  spender,
  tokens,
  enabled = true,
}: {
  chain_id: number;
  account: Address;
  spender: Address;
  tokens: Address[];
  enabled?: boolean;
}) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getAccountAllowanceQueryOptions(
      RPC_API_KEYS,
      chain_id,
      account,
      spender,
      tokens,
    ),
    enabled,
  });
};

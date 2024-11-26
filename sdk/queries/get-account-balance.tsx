import type { Address } from "viem";
import type { TypedRpcApiKeys } from "@/sdk/client";
import type { UseQueryOptions } from "@tanstack/react-query";

import { createPublicClient, http, erc20Abi } from "viem";
import { getChain } from "@/sdk/utils";

export const getAccountBalance = async ({
  RPC_API_KEYS,
  chain_id,
  account,
  tokens,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account: string;
  tokens: string[];
}) => {
  const chain = getChain(chain_id);

  const publicClient = createPublicClient({
    chain,
    transport: http(RPC_API_KEYS[chain_id]),
  });

  const contractsBalance = tokens.map((token_address) => ({
    address: token_address as Address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account],
  }));

  const query = publicClient.multicall({ contracts: contractsBalance });

  return query;
};

export const getAccountBalanceQueryOptions = (
  RPC_API_KEYS: TypedRpcApiKeys,
  chain_id: number,
  account: string,
  tokens: string[],
): UseQueryOptions => ({
  queryKey: [
    "token-balance",
    `chain-id=${chain_id}`,
    `account=${account}`,
    `tokens=${tokens.join(":")}`,
  ],
  queryFn: async () => {
    const result = await getAccountBalance({
      RPC_API_KEYS,
      chain_id,
      account,
      tokens,
    });

    return result;
  },

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

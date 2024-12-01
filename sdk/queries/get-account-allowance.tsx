import type { Address } from "viem";
import type { TypedRpcApiKeys } from "@/sdk/client";
import type { UseQueryOptions } from "@tanstack/react-query";

import { createPublicClient, http, erc20Abi } from "viem";
import { getChain } from "@/sdk/utils";

export const getAccountAllowance = async ({
  RPC_API_KEYS,
  chain_id,
  account,
  spender,
  tokens,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account: Address;
  spender: Address;
  tokens: Address[];
}) => {
  const chain = getChain(chain_id);

  const publicClient = createPublicClient({
    batch: {
      multicall: true,
    },
    chain,
    transport: http(RPC_API_KEYS[chain_id]),
  });

  const contractsBalance = tokens.map((token_address) => ({
    address: token_address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account, spender],
  }));

  const query = publicClient.multicall({ contracts: contractsBalance });

  return query;
};

export const getAccountAllowanceQueryOptions = (
  RPC_API_KEYS: TypedRpcApiKeys,
  chain_id: number,
  account: Address,
  spender: Address,
  tokens: Address[],
) => ({
  queryKey: [
    "token-allowance",
    `chain-id=${chain_id}`,
    `account=${account}`,
    `tokens=${tokens.join(":")}`,
  ],
  queryFn: async () => {
    const result = await getAccountAllowance({
      RPC_API_KEYS,
      chain_id,
      account,
      spender,
      tokens,
    });

    return result;
  },

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

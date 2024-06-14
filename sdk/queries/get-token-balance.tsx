import type { Chain, Address } from "viem";
import { createPublicClient, http, erc20Abi } from "viem";
import { getChain } from "@/sdk/utils";

export const getTokenBalance = async (
  chain_id: number,
  token_address: Address,
  user_address: Address,
) => {
  const chain: Chain = getChain(chain_id);

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });

  const query = publicClient.readContract({
    address: token_address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [user_address],
  });

  return query;
};

export const getTokenBalanceQueryOptions = (
  chain_id: number,
  token_address: Address,
  user_address: Address,
) => ({
  queryKey: [
    "token-balance",
    `chain_id=${chain_id}`,
    `token_address=${token_address}`,
    `user_address=${user_address}`,
  ],
  queryFn: async () => {
    const result = await getTokenBalance(chain_id, token_address, user_address);

    return result;
  },
  keepPreviousData: true,
});

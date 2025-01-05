import { type Address, erc20Abi, createPublicClient, http } from "viem";
import { getSupportedChain, parseRawAmountToTokenAmount } from "@/sdk/utils";
import { TypedRpcApiKeys } from "@/sdk/client";
import { getSupportedToken } from "@/sdk/constants";

export type GetWalletTokenBalanceQueryParams = {
  chain_id: number;
  token_address: string;
  account_address: string;
};

export type GetWalletTokenBalanceQueryOptionsParams = {
  RPC_API_KEYS: TypedRpcApiKeys;
} & GetWalletTokenBalanceQueryParams;

export const getWalletTokenBalanceQueryFunction = async ({
  chain_id,
  token_address,
  account_address,
  RPC_API_KEYS,
}: GetWalletTokenBalanceQueryOptionsParams) => {
  try {
    const chainClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: getSupportedChain(chain_id),
      transport: http(RPC_API_KEYS[chain_id]),
    });

    const contracts = [
      {
        address: token_address as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account_address as Address],
      },
    ];

    const query = await chainClient.multicall({ contracts });

    const current_balance = query[0]?.result?.toString() ?? "0";

    const token_id = `${chain_id}-${token_address.toLowerCase()}`;
    const token_data = getSupportedToken(token_id);
    const token_amount = parseRawAmountToTokenAmount(
      current_balance,
      token_data.decimals,
    );

    return {
      ...token_data,
      raw_amount: current_balance,
      token_amount: token_amount,
    };
  } catch (err) {
    const token_id = `${chain_id}-${token_address.toLowerCase()}`;
    const token_data = getSupportedToken(token_id);

    return {
      ...token_data,
      raw_amount: "0",
      token_amount: "0",
    };
  }
};

export const getWalletTokenBalanceQueryOptions = ({
  RPC_API_KEYS,
  chain_id,
  account_address,
  token_address,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
  token_address: string;
}) => ({
  queryKey: [
    "get-wallet-token-balance",
    {
      chain_id,
      account_address,
      token_address,
    },
  ],
  queryFn: () =>
    getWalletTokenBalanceQueryFunction({
      RPC_API_KEYS,
      chain_id,
      account_address,
      token_address,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

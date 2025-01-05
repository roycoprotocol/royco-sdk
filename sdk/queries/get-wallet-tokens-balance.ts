import { type Address, erc20Abi, createPublicClient, http } from "viem";
import { getSupportedChain, parseRawAmountToTokenAmount } from "@/sdk/utils";
import { TypedRpcApiKeys } from "@/sdk/client";
import { getSupportedToken } from "@/sdk/constants";

export type GetWalletTokensBalanceQueryParams = {
  chain_id: number;
  token_addresses: string[];
  account_address: string;
};

export type GetWalletTokensBalanceQueryOptionsParams = {
  RPC_API_KEYS: TypedRpcApiKeys;
} & GetWalletTokensBalanceQueryParams;

export const getWalletTokensBalanceQueryFunction = async ({
  chain_id,
  token_addresses,
  account_address,
  RPC_API_KEYS,
}: GetWalletTokensBalanceQueryOptionsParams) => {
  try {
    const chainClient = createPublicClient({
      batch: {
        multicall: true,
      },
      chain: getSupportedChain(chain_id),
      transport: http(RPC_API_KEYS[chain_id]),
    });

    const contracts = token_addresses.map((token_address) => ({
      address: token_address as Address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account_address as Address],
    }));

    const query = await chainClient.multicall({ contracts });

    const current_balances = query.map(
      (result) => result?.result?.toString() ?? "0",
    );

    const token_datas = token_addresses.map((token_address, index) => {
      const token_id = `${chain_id}-${token_address.toLowerCase()}`;
      const token_data = getSupportedToken(token_id);
      const raw_amount = current_balances[index];
      const token_amount = parseRawAmountToTokenAmount(
        current_balances[index],
        token_data.decimals,
      );

      return {
        ...token_data,
        raw_amount,
        token_amount,
      };
    });

    return token_datas;
  } catch (err) {
    const token_datas = token_addresses.map((token_address, index) => {
      const token_id = `${chain_id}-${token_address.toLowerCase()}`;
      const token_data = getSupportedToken(token_id);
      const raw_amount = "0";
      const token_amount = 0;

      return {
        ...token_data,
        raw_amount,
        token_amount,
      };
    });

    return token_datas;
  }
};

export const getWalletTokensBalanceQueryOptions = ({
  RPC_API_KEYS,
  chain_id,
  account_address,
  token_addresses,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
  token_addresses: string[];
}) => ({
  queryKey: [
    "get-wallet-tokens-balance",
    {
      chain_id,
      account_address,
      token_addresses,
    },
  ],
  queryFn: () =>
    getWalletTokensBalanceQueryFunction({
      RPC_API_KEYS,
      chain_id,
      account_address,
      token_addresses,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

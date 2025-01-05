import { type Address, createPublicClient, http, erc4626Abi } from "viem";
import { getSupportedChain, parseRawAmountToTokenAmount } from "@/sdk/utils";
import { TypedRpcApiKeys } from "@/sdk/client";
import { getSupportedToken, NULL_ADDRESS } from "@/sdk/constants";

export type GetVaultTokenBalanceQueryParams = {
  chain_id: number;
  vault_address: string;
  account_address: string;
};

export type GetVaultTokenBalanceQueryOptionsParams = {
  RPC_API_KEYS: TypedRpcApiKeys;
} & GetVaultTokenBalanceQueryParams;

export const getVaultTokenBalanceQueryFunction = async ({
  chain_id,
  vault_address,
  account_address,
  RPC_API_KEYS,
}: GetVaultTokenBalanceQueryOptionsParams) => {
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
        address: vault_address as Address,
        abi: erc4626Abi,
        functionName: "asset",
        args: [],
      },
      {
        address: vault_address as Address,
        abi: erc4626Abi,
        functionName: "maxWithdraw",
        args: [account_address as Address],
      },
    ];

    const query = await chainClient.multicall({ contracts });

    const current_asset = query[0]?.result?.toString() ?? NULL_ADDRESS;
    const current_balance = query[1]?.result?.toString() ?? "0";

    const token_id = `${chain_id}-${current_asset.toLowerCase()}`;
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
    const token_id = `${chain_id}-${NULL_ADDRESS.toLowerCase()}`;
    const token_data = getSupportedToken(token_id);

    return {
      ...token_data,
      raw_amount: "0",
      token_amount: "0",
    };
  }
};

export const getVaultTokenBalanceQueryOptions = ({
  RPC_API_KEYS,
  chain_id,
  account_address,
  vault_address,
}: {
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
  vault_address: string;
}) => ({
  queryKey: [
    "get-vault-token-balance",
    {
      chain_id,
      account_address,
      vault_address,
    },
  ],
  queryFn: () =>
    getVaultTokenBalanceQueryFunction({
      RPC_API_KEYS,
      chain_id,
      account_address,
      vault_address,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

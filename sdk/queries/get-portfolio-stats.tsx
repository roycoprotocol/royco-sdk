import { TypedRpcApiKeys, type TypedRoycoClient } from "@/sdk/client";
import {
  parseRawAmount,
  parseRawAmountToTokenAmount,
  parseTokenAmountToTokenAmountUsd,
} from "../utils/safe-parsers";
import { getSupportedToken } from "../constants/token-map";
import { SupportedToken } from "../constants";
import { getChain } from "../utils/get-chain-all";
import { Abi, Address, createPublicClient } from "viem";
import { http } from "viem";
import { ContractMap } from "../contracts";
import { RoycoMarketUserType } from "../market";

const getRecipeMarketValue = async (
  client: TypedRoycoClient,
  account_address: string,
  chain_id?: number,
) => {
  // First get total count
  const countResult = await client.rpc("get_enriched_positions_recipe", {
    account_address: account_address,
    chain_id: chain_id,
    page_index: 0,
  });

  const totalCount = countResult.data?.count || 0;
  const totalPages = Math.ceil(totalCount / 20); // Since API returns 20 per page

  // Fetch all pages in parallel
  const promises = Array.from({ length: totalPages }, (_, i) =>
    client.rpc("get_enriched_positions_recipe", {
      account_address: account_address,
      chain_id: chain_id,
      page_index: i,
    }),
  );
  const results = await Promise.all(promises);

  let total_market_value = 0;

  for (const result of results) {
    if (!!result.data?.data && result.data.data.length > 0) {
      for (const row of result.data.data) {
        if (!!row.input_token_id && !!row.token_ids && !!row.token_amounts) {
          // Add input token value
          const input_token_info: SupportedToken = getSupportedToken(
            row.input_token_id,
          );
          const input_token_price = row.input_token_price ?? 0;
          const input_token_raw_amount: string = parseRawAmount(row.quantity);
          const input_token_token_amount: number = parseRawAmountToTokenAmount(
            input_token_raw_amount,
            input_token_info.decimals,
          );
          const input_token_token_amount_usd = parseTokenAmountToTokenAmountUsd(
            input_token_token_amount,
            input_token_price,
          );
          total_market_value += input_token_token_amount_usd;

          // Add reward token values
          row.token_ids.forEach((tokenId: string, i: number) => {
            const token_info: SupportedToken = getSupportedToken(tokenId);
            const token_price = row.token_price_values
              ? (row.token_price_values[i] ?? 0)
              : 0;
            const raw_amount: string = parseRawAmount(
              row.token_amounts && row.token_amounts[i],
            );
            const token_amount: number = parseRawAmountToTokenAmount(
              raw_amount,
              token_info.decimals,
            );
            const token_amount_usd = parseTokenAmountToTokenAmountUsd(
              token_amount,
              token_price,
            );
            total_market_value += token_amount_usd;
          });
        }
      }
    }
  }

  return {
    total_market_value,
  };
};

const getVaultMarketValue = async (
  client: TypedRoycoClient,
  RPC_API_KEYS: TypedRpcApiKeys,
  account_address: string,
  chain_id?: number,
) => {
  // First get total count
  const countResult = await client.rpc("get_enriched_positions_vault", {
    account_address: account_address,
    chain_id: chain_id,
    page_index: 0,
  });

  const totalCount = countResult.data?.count || 0;
  const totalPages = Math.ceil(totalCount / 20); // Since API returns 20 per page

  // Fetch all pages in parallel
  const promises = Array.from({ length: totalPages }, (_, i) =>
    client.rpc("get_enriched_positions_vault", {
      account_address: account_address,
      chain_id: chain_id,
      page_index: i,
    }),
  );
  const results = await Promise.all(promises);

  let total_market_value = 0;

  for (const result of results) {
    if (!!result.data?.data && result.data.data.length > 0) {
      for (const row of result.data.data) {
        if (
          !!row.input_token_id &&
          !!row.token_ids &&
          !!row.token_amounts &&
          !!row.chain_id
        ) {
          const chain = getChain(row.chain_id);
          const publicClient = createPublicClient({
            chain,
            transport: http(RPC_API_KEYS[row.chain_id]),
          });

          // Get the raw incentives amount for AP
          const incentives_ap_contracts = row.token_ids.map((incentiveId) => ({
            address: row.market_id as Address,
            abi: ContractMap[row.chain_id as keyof typeof ContractMap][
              "WrappedVault"
            ].abi as Abi,
            functionName: "currentUserRewards",
            args: [incentiveId.split("-")[1], account_address],
          }));
          const raw_incentives_amount_ap_data = await publicClient.multicall({
            contracts: incentives_ap_contracts,
          });

          // Get the raw input token amount for AP
          const raw_input_token_amount_ap_data = await publicClient.multicall({
            contracts: [
              {
                address: row.market_id as Address,
                abi: ContractMap[row.chain_id as keyof typeof ContractMap][
                  "WrappedVault"
                ].abi as Abi,
                functionName: "convertToAssets",
                args: [row.quantity],
              },
            ],
          });

          // Add input token value
          const input_token_info: SupportedToken = getSupportedToken(
            row.input_token_id,
          );
          const input_token_price = row.input_token_price ?? 0;

          let raw_input_token_amount: string = "0";
          if (row.offer_side === RoycoMarketUserType.ap.value) {
            raw_input_token_amount = parseRawAmount(
              raw_input_token_amount_ap_data[0].status === "success"
                ? (raw_input_token_amount_ap_data[0].result?.toString() ?? "0")
                : "0",
            );
          } else {
            raw_input_token_amount = row.quantity ?? "0";
          }
          const input_token_raw_amount: string = raw_input_token_amount;

          const input_token_token_amount: number = parseRawAmountToTokenAmount(
            input_token_raw_amount,
            input_token_info.decimals,
          );
          const input_token_token_amount_usd = parseTokenAmountToTokenAmountUsd(
            input_token_token_amount,
            input_token_price,
          );
          total_market_value += input_token_token_amount_usd;

          // Add reward token values
          row.token_ids.forEach((tokenId: string, i: number) => {
            const token_info: SupportedToken = getSupportedToken(tokenId);
            const token_price = row.token_price_values?.[i] ?? 0;

            let raw_amount: string = "0";
            if (row.offer_side === RoycoMarketUserType.ap.value) {
              raw_amount = parseRawAmount(
                raw_incentives_amount_ap_data[i]?.result?.toString() ?? "0",
              );
            } else {
              raw_amount = parseRawAmount(
                row.token_amounts && row.token_amounts[i],
              );
            }

            const token_amount: number = parseRawAmountToTokenAmount(
              raw_amount,
              token_info.decimals,
            );
            const token_amount_usd = parseTokenAmountToTokenAmountUsd(
              token_amount,
              token_price,
            );
            total_market_value += token_amount_usd;
          });
        }
      }
    }
  }

  return {
    total_market_value,
  };
};

export const getPortfolioStatsQueryOptions = (
  client: TypedRoycoClient,
  RPC_API_KEYS: TypedRpcApiKeys,
  account_address: string,
  chain_id?: number,
) => ({
  queryKey: ["portfolio-stats", account_address, chain_id],
  queryFn: async () => {
    const { total_market_value: recipeMarketValue } =
      await getRecipeMarketValue(client, account_address, chain_id);

    const { total_market_value: vaultMarketValue } = await getVaultMarketValue(
      client,
      RPC_API_KEYS,
      account_address,
      chain_id,
    );

    return { total_assets: vaultMarketValue + recipeMarketValue };
  },

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

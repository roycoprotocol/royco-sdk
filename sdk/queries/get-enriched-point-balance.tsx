import type { TypedRoycoClient } from "@/sdk/client";
import {
  generateQueryKey,
  parseRawAmountToTokenAmount,
  parseTokenAmountToTokenAmountUsd,
} from "@/sdk/utils";
import { getSupportedToken, SupportedToken } from "@/sdk/constants";

export type GetEnrichedPointBalanceQueryParams = {
  client: TypedRoycoClient;
  chain_id: number;
  contract_address: string;
  account_address: string;
};

export const getEnrichedPointBalanceQueryFunction = async ({
  client,
  chain_id,
  contract_address,
  account_address,
}: GetEnrichedPointBalanceQueryParams) => {
  const [
    { data: raw_point_balances_data },
    { data: raw_points_data },
    { data: token_quotes_data },
  ] = await Promise.all([
    client
      .from("raw_point_balances")
      .select("id, chain_id, contract_address, account_address, amount::text")
      .eq("chain_id", chain_id)
      .eq("contract_address", contract_address)
      .eq("account_address", account_address)
      .limit(1)
      .throwOnError(),
    client
      .from("raw_points")
      .select(
        "id, chain_id, contract_address, owner, name, symbol, decimals, block_number, block_timestamp, transaction_hash",
      )
      .eq("chain_id", chain_id)
      .eq("contract_address", contract_address)
      .limit(1)
      .throwOnError(),
    client
      .from("token_quotes_latest")
      .select("*")
      .eq("token_id", `${chain_id}-${contract_address}`)
      .limit(1)
      .throwOnError(),
  ]);

  let data: {
    chain_id: number;
    contract_address: string;
    account_address: string;
    token_data: SupportedToken & {
      token_id: string;
      total_supply: number;
      fdv: number;
      price: number;
      raw_amount: string;
      token_amount: number;
      token_amount_usd: number;
    };
  } | null = null;

  if (raw_points_data?.[0]) {
    let token_id = `${chain_id}-${contract_address}`;
    const raw_token_data = getSupportedToken(token_id);

    const decimals = raw_points_data[0].decimals;

    const raw_amount = raw_point_balances_data?.[0]?.amount ?? "0";
    const token_amount = parseRawAmountToTokenAmount(raw_amount, decimals);
    const token_amount_usd = parseTokenAmountToTokenAmountUsd(
      token_amount,
      token_quotes_data?.[0]?.price ?? 0,
    );

    data = {
      chain_id: chain_id,
      contract_address: contract_address,
      account_address: account_address,
      token_data: {
        ...raw_token_data,
        type: "point",
        ...raw_points_data[0],
        token_id,
        total_supply: token_quotes_data?.[0]?.total_supply ?? 0,
        fdv: token_quotes_data?.[0]?.fdv ?? 0,
        price: token_quotes_data?.[0]?.price ?? 0,
        raw_amount,
        token_amount,
        token_amount_usd,
      },
    };
  }

  return data;
};

export const getEnrichedPointBalanceQueryOptions = ({
  client,
  chain_id,
  contract_address,
  account_address,
}: GetEnrichedPointBalanceQueryParams) => ({
  queryKey: generateQueryKey("get-enriched-point-balance", {
    chain_id,
    contract_address,
    account_address,
  }),
  queryFn: getEnrichedPointBalanceQueryFunction({
    client,
    chain_id,
    contract_address,
    account_address,
  }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

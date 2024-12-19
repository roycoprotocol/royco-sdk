import type { TypedRoycoClient } from "@/sdk/client";
import { generateQueryKey } from "@/sdk/utils";
import { getSupportedToken, SupportedToken } from "../constants";

export type GetEnrichedPointProgramQueryParams = {
  chain_id: number;
  contract_address: string;
};

export type GetEnrichedPointProgramQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetEnrichedPointProgramQueryParams;

export const getEnrichedPointProgramQueryFunction = async ({
  client,
  chain_id,
  contract_address,
}: GetEnrichedPointProgramQueryOptionsParams) => {
  const [{ data: raw_points_data }, { data: token_quotes_data }] =
    await Promise.all([
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

  let data:
    | (SupportedToken & {
        owner: string;
        block_number: number;
        block_timestamp: number;
        transaction_hash: string;
        token_id: string;
        total_supply: number;
        fdv: number;
        price: number;
      })
    | null = null;

  if (raw_points_data?.[0] && token_quotes_data?.[0]) {
    let token_id = `${chain_id}-${contract_address}`;
    const raw_token_data = getSupportedToken(token_id);

    data = {
      ...raw_token_data,
      type: "point",
      ...raw_points_data[0],
      token_id: token_quotes_data[0].token_id ?? raw_points_data[0].id,
      total_supply: token_quotes_data[0].total_supply ?? 0,
      fdv: token_quotes_data[0].fdv ?? 0,
      price: token_quotes_data[0].price ?? 0,
    };
  }

  return data;
};

export const getEnrichedPointProgramQueryOptions = ({
  client,
  chain_id,
  contract_address,
}: GetEnrichedPointProgramQueryOptionsParams) => ({
  queryKey: generateQueryKey("get-enriched-point-program", {
    chain_id,
    contract_address,
  }),
  queryFn: () =>
    getEnrichedPointProgramQueryFunction({
      client,
      chain_id,
      contract_address,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

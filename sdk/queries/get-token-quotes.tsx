import type { TypedRoycoClient } from "@/sdk/client";
import { getSupportedToken } from "@/sdk/constants";
import { type CustomTokenData } from "../types";

export type GetTokenQuotesQueryParams = {
  token_ids: string[];
  custom_token_data?: CustomTokenData;
};

export type GetTokenQuotesQueryOptionsParams = GetTokenQuotesQueryParams & {
  client: TypedRoycoClient;
};

export const getTokenQuotesQueryFunction = async ({
  client,
  token_ids,
  custom_token_data,
}: GetTokenQuotesQueryOptionsParams) => {
  const { data } = await client
    .rpc("get_token_quotes", {
      token_ids,
      custom_token_data,
    })
    .throwOnError();

  const new_rows = token_ids.map((token_id) => {
    const token_data = getSupportedToken(token_id);
    let quote_data = data?.find((r) => r.token_id.toLowerCase() === token_id);

    if (!quote_data) {
      quote_data = {
        token_id,
        price: 0,
        total_supply: 0,
        fdv: 0,
        decimals: 0,
      };
    }

    return {
      ...token_data,
      ...quote_data,
      decimals: quote_data.decimals || token_data.decimals,
    };
  });

  return new_rows;
};

export const getTokenQuotesQueryOptions = ({
  client,
  token_ids,
  custom_token_data,
}: GetTokenQuotesQueryOptionsParams) => ({
  queryKey: [
    "get-tokens-quotes",
    {
      token_ids,
      custom_token_data,
    },
  ],
  queryFn: () =>
    getTokenQuotesQueryFunction({ client, token_ids, custom_token_data }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

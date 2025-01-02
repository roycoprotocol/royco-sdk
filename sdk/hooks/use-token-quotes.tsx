import type { RoycoClient } from "@/sdk/client";

import { useQuery } from "@tanstack/react-query";
import {
  getTokenQuotesQueryFunction,
  getTokenQuotesQueryOptions,
  GetTokenQuotesQueryParams,
} from "@/sdk/queries";
import { useRoycoClient } from "@/sdk/client";
import { getSupportedToken } from "@/sdk/constants";

export type UseTokenQuotesParams = GetTokenQuotesQueryParams & {
  enabled?: boolean;
};

export const useTokenQuotes = ({
  token_ids,
  custom_token_data,
  enabled = true,
}: UseTokenQuotesParams) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getTokenQuotesQueryOptions({ client, token_ids, custom_token_data }),
    enabled,
  });
};

export const DEFAULT_TOKEN_QUOTE = {
  price: 0,
  total_supply: 0,
  fdv: 0,
};

export const extractTokenQuote = ({
  token_id,
  token_quotes,
}: {
  token_id: string;
  token_quotes: Awaited<ReturnType<typeof getTokenQuotesQueryFunction>>;
}) => {
  const available_token_quotes = token_quotes ?? [];

  const available_token_quote = available_token_quotes.find(
    (quote) => quote.token_id === token_id,
  );

  let token_quote = available_token_quote;

  if (!token_quote) {
    token_quote = {
      ...getSupportedToken(token_id),
      token_id,
      ...DEFAULT_TOKEN_QUOTE,
    };
  }

  return token_quote;
};

export const getTokenQuote = ({
  token_id,
  token_quotes,
}: {
  token_id: string;
  token_quotes: ReturnType<typeof useTokenQuotes>;
}) => {
  const available_token_quotes = token_quotes.data ?? [];

  const available_token_quote = available_token_quotes.find(
    (quote) => quote.token_id === token_id,
  );

  let token_quote = available_token_quote;

  if (!token_quote) {
    token_quote = {
      ...getSupportedToken(token_id),
      token_id,
      ...DEFAULT_TOKEN_QUOTE,
    };
  }

  return token_quote;
};

import type { TypedRoycoClient } from "@/sdk/client";
import { isSolidityAddressValid } from "../utils";

export type GetUserPositionQueryParams = {
  account_address?: string;
};

export type GetUserPositionQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetUserPositionQueryParams;

export const getUserPositionQueryFunction = async ({
  client,
  account_address,
}: GetUserPositionQueryOptionsParams) => {
  if (!account_address) {
    return null;
  }

  if (!isSolidityAddressValid("address", account_address)) {
    return null;
  }

  let query = client
    .from("leaderboard")
    .select("*")
    .contains("wallets", [account_address.toLowerCase()])
    .limit(1);

  const { data } = await query.throwOnError();

  if (!data || data.length === 0) {
    return null;
  }

  const position = data[0]?.rank ?? null;

  return position;
};

export const getUserPositionQueryOptions = ({
  client,
  account_address,
}: GetUserPositionQueryOptionsParams) => ({
  queryKey: [
    "get-user-position",
    {
      account_address,
    },
  ],
  queryFn: () =>
    getUserPositionQueryFunction({
      client,
      account_address,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

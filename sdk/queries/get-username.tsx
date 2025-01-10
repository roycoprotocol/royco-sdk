import type { TypedRoycoClient } from "@/sdk/client";

export type GetUsernameQueryParams = {
  account_address?: string;
};

export type GetUsernameQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetUsernameQueryParams;

export const getUsernameQueryFunction = async ({
  client,
  account_address,
}: GetUsernameQueryOptionsParams) => {
  if (!account_address) {
    return null;
  }

  let query = client
    .from("wallet_user_map")
    .select("*")
    .eq("account_address", account_address)
    .limit(1);

  const { data } = await query.throwOnError();

  if (!data || data.length === 0) {
    return null;
  }

  const username = data[0]?.username ?? null;

  return username;
};

export const getUsernameQueryOptions = ({
  client,
  account_address,
}: GetUsernameQueryOptionsParams) => ({
  queryKey: [
    "get-username",
    {
      account_address,
    },
  ],
  queryFn: () =>
    getUsernameQueryFunction({
      client,
      account_address,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

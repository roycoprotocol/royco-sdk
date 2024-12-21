import type { TypedRoycoClient } from "@/sdk/client";
import { getSupportedToken, SupportedToken } from "@/sdk/constants";

export type GetAllowedIpPointsQueryParams = {
  chain_id?: number; // chain_id is optional because it allows to fetch all points for a user in 1 chain as well as all points for a user in all chains
  account_address: string;
};

export type GetAllowedIpPointsQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetAllowedIpPointsQueryParams;

export const getAllowedIpPointsQueryFunction = async ({
  client,
  chain_id,
  account_address,
}: GetAllowedIpPointsQueryOptionsParams) => {
  let query = client
    .from("raw_authorized_point_issuers")
    .select("chain_id, contract_address")
    .eq("account_address", account_address);

  // Apply conditional filters
  if (chain_id !== undefined) {
    query = query.eq("chain_id", chain_id);
  }

  const { data } = await query.throwOnError();

  let point_list: SupportedToken[] = [];

  // Create token list
  if (!!data && data.length > 0) {
    point_list = data.map((item) => {
      let token_id = `${item.chain_id}-${item.contract_address}`;
      return getSupportedToken(token_id);
    });
  }

  return point_list;
};

export const getAllowedIpPointsQueryOptions = ({
  client,
  chain_id,
  account_address,
}: GetAllowedIpPointsQueryOptionsParams) => ({
  queryKey: [
    "get-allowed-ip-points",
    {
      chain_id,
      account_address,
    },
  ],
  queryFn: () =>
    getAllowedIpPointsQueryFunction({
      client,
      chain_id,
      account_address,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

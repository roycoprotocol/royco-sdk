import type { TypedRoycoClient } from "@/sdk/client";
import { getSupportedToken, SupportedToken } from "@/sdk/constants";

export type GetAllowedApPointsQueryParams = {
  id: string; // This is the global market id
};

export type GetAllowedApPointsQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetAllowedApPointsQueryParams;

export const getAllowedApPointsQueryFunction = async ({
  client,
  id,
}: GetAllowedApPointsQueryOptionsParams) => {
  let query = client
    .from("enriched_markets_stats")
    .select("incentive_ids")
    .eq("id", id)
    .limit(1);

  const { data } = await query.throwOnError();

  let point_list: SupportedToken[] = [];

  // Create token list
  if (data?.[0]?.incentive_ids) {
    point_list = data[0].incentive_ids.map((token_id) => {
      return getSupportedToken(token_id);
    });

    point_list = point_list.filter((token) => token.type === "point");
  }

  return point_list;
};

export const getAllowedApPointsQueryOptions = ({
  client,
  id,
}: GetAllowedApPointsQueryOptionsParams) => ({
  queryKey: [
    "get-allowed-ap-points",
    {
      id,
    },
  ],
  queryFn: () =>
    getAllowedApPointsQueryFunction({
      client,
      id,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

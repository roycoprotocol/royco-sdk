import type { TypedRoycoClient } from "@/sdk/client";
import type { CustomTokenData } from "@/sdk/types";

export type GetMarketOffersQueryParams = {
  chain_id: number;
  market_type: number;
  market_id: string;
  offer_side: number;
  quantity: string;
  custom_token_data?: CustomTokenData;
  incentive_ids?: string[];
  incentive_amounts?: string[];
};

export type GetMarketOffersQueryOptionsParams = {
  client: TypedRoycoClient;
} & GetMarketOffersQueryParams;

export const getMarketOffersQueryFunction = async ({
  client,
  chain_id,
  market_type,
  market_id,
  offer_side,
  quantity,
  custom_token_data,
  incentive_ids,
  incentive_amounts,
}: GetMarketOffersQueryOptionsParams) => {
  const { data } = await client
    .rpc("get_market_offers", {
      in_chain_id: chain_id,
      in_market_type: market_type,
      in_market_id: market_id,
      in_offer_side: offer_side,
      in_quantity: quantity,
      custom_token_data: custom_token_data,
      in_incentive_ids: incentive_ids,
      in_incentive_amounts: incentive_amounts,
    })
    .throwOnError();

  return data;
};

export const getMarketOffersQueryOptions = ({
  client,
  chain_id,
  market_type,
  market_id,
  offer_side,
  quantity,
  custom_token_data,
  incentive_ids,
  incentive_amounts,
}: GetMarketOffersQueryOptionsParams) => ({
  queryKey: [
    "get-market-offers",
    {
      chain_id,
      market_type,
      market_id,
      offer_side,
      quantity,
      custom_token_data,
      incentive_ids,
      incentive_amounts,
    },
  ],
  queryFn: () =>
    getMarketOffersQueryFunction({
      client,
      chain_id,
      market_type,
      market_id,
      offer_side,
      quantity,
      custom_token_data,
      incentive_ids,
      incentive_amounts,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60 * 1, // 1 min
  refetchOnWindowFocus: false,
});

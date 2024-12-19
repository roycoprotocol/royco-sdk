import { SupportedTokenList, type SupportedToken } from "@/sdk/constants";
import {
  RoycoMarketUserType,
  type TypedRoycoMarketUserType,
} from "@/sdk/market";
import { useAllowedApPoints } from "./use-allowed-ap-points";
import { useAllowedIpPoints } from "./use-allowed-ip-points";

export const useAllowedTokens = ({
  chain_id,
  page = 0,
  page_size = 20,
  search,
  included_token_ids,
  excluded_token_ids,
  type = "token",
  account_address,
  id,
  user_type = RoycoMarketUserType.ap.id,
}: {
  chain_id?: number;
  page?: number;
  page_size?: number;
  search?: string;
  included_token_ids?: string[] | undefined | null;
  excluded_token_ids?: string[] | undefined | null;
  type?: "token" | "point";
  account_address?: string;
  id?: string; // This is the global market id
  user_type?: TypedRoycoMarketUserType;
}) => {
  const propsAllowedApPoints = useAllowedApPoints({
    id: id ?? "",
  });

  const propsAllowedIpPoints = useAllowedIpPoints({
    chain_id: chain_id ?? 0,
    account_address: account_address ?? "",
  });

  const filterFunctions = {
    byType: (tokens: typeof SupportedTokenList) =>
      type === "point"
        ? tokens.filter((token) => token.type === "point")
        : tokens.filter((token) => token.type === "token"),

    byChainId: (tokens: typeof SupportedTokenList) =>
      chain_id ? tokens.filter((token) => token.chain_id === chain_id) : tokens,

    bySearch: (tokens: typeof SupportedTokenList) =>
      !search || search.trim().length === 0
        ? tokens
        : tokens.filter((token) => {
            const searchTerm = search.toLowerCase();
            return (
              token.symbol.toLowerCase().startsWith(searchTerm) ||
              token.name.toLowerCase().includes(searchTerm) ||
              token.contract_address.toLowerCase().includes(searchTerm)
            );
          }),

    byIncludedTokenIds: (tokens: typeof SupportedTokenList) =>
      !included_token_ids || included_token_ids.length === 0
        ? tokens
        : tokens.filter((token) => included_token_ids.includes(token.id)),

    byExcludedTokenIds: (tokens: typeof SupportedTokenList) =>
      !excluded_token_ids || excluded_token_ids.length === 0
        ? tokens
        : tokens.filter((token) => !excluded_token_ids.includes(token.id)),
  };

  const filteredTokens = [
    filterFunctions.byType,
    filterFunctions.byChainId,
    filterFunctions.bySearch,
    filterFunctions.byIncludedTokenIds,
    filterFunctions.byExcludedTokenIds,
  ].reduce(
    (tokens, filterFn) => filterFn(tokens),
    type === "token"
      ? SupportedTokenList
      : user_type === RoycoMarketUserType.ap.id
        ? (propsAllowedApPoints.data ?? [])
        : (propsAllowedIpPoints.data ?? []),
  );

  const total_pages = Math.ceil(filteredTokens.length / page_size);
  const count = filteredTokens.length;

  let data = filteredTokens
    .sort((a, b) => a.symbol.localeCompare(b.symbol))
    .slice(page * page_size, (page + 1) * page_size);

  const isLoading =
    propsAllowedApPoints.isLoading || propsAllowedIpPoints.isLoading;

  return {
    isLoading,
    data,
    page,
    total_pages,
    count,
  };
};

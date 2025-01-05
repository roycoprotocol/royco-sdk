import { useQuery } from "@tanstack/react-query";
import {
  type GetVaultPreviewIncentivesQueryParams,
  getVaultPreviewIncentivesQueryOptions,
} from "@/sdk/queries";
import { useRpcApiKeys } from "@/sdk/client";

export type UseVaultPreviewIncentivesParams =
  GetVaultPreviewIncentivesQueryParams & {
    enabled?: boolean;
  };

export const useVaultPreviewIncentives = ({
  chain_id,
  vault_address,
  incentive_ids,
  quantity,
  completeMarket,
  tokenQuotes,
  enabled = true,
}: UseVaultPreviewIncentivesParams) => {
  const RPC_API_KEYS = useRpcApiKeys();

  return useQuery({
    ...getVaultPreviewIncentivesQueryOptions({
      RPC_API_KEYS: RPC_API_KEYS ?? {},
      chain_id,
      vault_address,
      incentive_ids,
      quantity,
      completeMarket,
      tokenQuotes,
    }),
    enabled,
  });
};

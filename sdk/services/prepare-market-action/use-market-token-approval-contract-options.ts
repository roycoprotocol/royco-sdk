import { TypedRpcApiKeys } from "@/sdk/client/RoycoClient";
import { TypedRoycoMarketType } from "@/sdk/market/utils";
import { useQuery } from "@tanstack/react-query";
import { getMarketTokenApprovalContractOptions } from "./utils";

export const useMarketTokenApprovalContractOptions = ({
  market_type,
  token_ids,
  required_approval_amounts,
  funding_vault,
  spender,
  RPC_API_KEYS,
  chain_id,
  account_address,
}: {
  market_type: TypedRoycoMarketType;
  token_ids: string[];
  required_approval_amounts: string[];
  funding_vault: string;
  spender: string;
  RPC_API_KEYS: TypedRpcApiKeys;
  chain_id: number;
  account_address: string;
}) => {
  return useQuery({
    queryKey: [
      "market-token-approval-contract-options",
      {
        market_type,
        token_ids,
        required_approval_amounts,
        funding_vault,
        spender,
        RPC_API_KEYS,
        chain_id,
        account_address,
      },
    ],
    queryFn: () =>
      getMarketTokenApprovalContractOptions({
        market_type,
        token_ids,
        required_approval_amounts,
        funding_vault,
        spender,
        RPC_API_KEYS,
        chain_id,
        account_address,
      }),
  });
};

import type { TypedRoycoClient } from "@/sdk/client";

export type GetAuthorizedPointIssuerCheckerQueryParams = {
  chain_id: number;
  contract_address: string;
  account_address: string;
};

export const getAuthorizedPointIssuerCheckerQueryFunction = async ({
  client,
  chain_id,
  contract_address,
  account_address,
}: {
  client: TypedRoycoClient;
  chain_id: number;
  contract_address: string;
  account_address: string;
}) => {
  const { data } = await client
    .from("raw_authorized_point_issuers")
    .select("id, chain_id, contract_address, account_address")
    .eq("chain_id", chain_id)
    .eq("contract_address", contract_address)
    .eq("account_address", account_address)
    .limit(1)
    .throwOnError();

  if (!!data && data.length > 0) {
    return true;
  }

  return false;
};

export const getAuthorizedPointIssuerCheckerQueryOptions = ({
  client,
  chain_id,
  contract_address,
  account_address,
}: {
  client: TypedRoycoClient;
  chain_id: number;
  contract_address: string;
  account_address: string;
}) => ({
  queryKey: [
    "get-authorized-point-issuer-checker",
    {
      chain_id,
      contract_address,
      account_address,
    },
  ],
  queryFn: () =>
    getAuthorizedPointIssuerCheckerQueryFunction({
      client,
      chain_id,
      contract_address,
      account_address,
    }),
  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

import type { TypedRoycoClient } from "@/sdk/client";
import type { UseQueryOptions } from "@tanstack/react-query";

import { isSolidityAddressValid } from "@/sdk/utils";

export const getContractsQueryOptions = (
  client: TypedRoycoClient,
  contracts: Array<{ chain_id: number; contract_address: string }>,
) => ({
  queryKey: [
    "get-contracts",
    {
      contracts,
    },
  ],
  queryFn: async () => {
    for (let i = 0; i < contracts.length; i++) {
      const contract_address = contracts[i]?.contract_address;

      if (isSolidityAddressValid("address", contract_address) === false) {
        return new Error(`Invalid contract address: ${contract_address}`);
      }
    }

    return client
      .rpc("get_contracts", {
        chain_ids: contracts.map((c) => c.chain_id),
        contract_addresses: contracts.map((c) =>
          c.contract_address.toLowerCase(),
        ),
      })
      .throwOnError()
      .then((result) => result.data);
  },

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

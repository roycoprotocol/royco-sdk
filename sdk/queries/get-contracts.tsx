import type { TypedRoycoClient } from "@/sdk/client";
import type { UseQueryOptions } from "@tanstack/react-query";

import { isSolidityAddressValid } from "@/sdk/utils";

export const getContractsQueryOptions = (
  client: TypedRoycoClient,
  contracts: Array<{ chain_id: number; contract_address: string }>,
): UseQueryOptions => ({
  queryKey: [
    "get-contracts",
    ...contracts.map(
      (contract) =>
        `chain_id=${contract.chain_id}:contract_address=${contract.contract_address}`,
    ),
  ],
  queryFn: async () => {
    for (let i = 0; i < contracts.length; i++) {
      const contract_address = contracts[i]?.contract_address;

      if (isSolidityAddressValid("address", contract_address) === false) {
        return new Error(`Invalid contract address: ${contract_address}`);
      }
    }

    return client
      .rpc("get_contracts", { _contracts: contracts })
      .throwOnError()
      .then((result) => result.data);
  },

  placeholderData: (previousData: any) => previousData,
  refetchInterval: 1000 * 60, // 1 min
  refetchOnWindowFocus: false,
});

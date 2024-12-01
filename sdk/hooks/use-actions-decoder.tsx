import { useQuery } from "@tanstack/react-query";
import {
  decodeActions,
  type decodeActionsReturnType,
  type TypedAbiElement,
} from "@/sdk/market";
import { getContractsQueryOptions } from "@/sdk/queries";
import { type RoycoClient, useRoycoClient } from "@/sdk/client";

export const useActionsDecoder = ({
  chain_id,
  script,
  abis,
  contract_map,
}: {
  chain_id: number;
  script: {
    commands: string[];
    state: string[];
  } | null;
  abis?: Array<TypedAbiElement>;
  contract_map?: Record<
    string,
    {
      contract_name: string;
    }
  >;
}) => {
  const client: RoycoClient = useRoycoClient();

  let data: decodeActionsReturnType["actions"] | null = null;
  let contracts: Array<{
    chain_id: number;
    contract_address: string;
  }> = [];

  if (!!script) {
    const res = decodeActions({ chain_id, script, abis, contract_map });

    if (!!res.actions) {
      contracts = res.actions.map((action) => {
        return {
          chain_id,
          contract_address: action.contract_address,
        };
      });
    }
  }

  const contractsProps = useQuery(getContractsQueryOptions(client, contracts));

  if (!!script && contractsProps.isLoading === false) {
    const fetchedAbis =
      !!contractsProps.data &&
      !(contractsProps.data instanceof Error) &&
      contractsProps.data
        .map((contract) => {
          return contract.abi;
        })
        .flat();

    const fetchedContractMap =
      !!contractsProps.data &&
      !(contractsProps.data instanceof Error) &&
      contractsProps.data.reduce(
        (acc, contract) => {
          const key = `${chain_id}-${contract.address}`.toLowerCase();
          if (!!contract.contract_name) {
            acc[key] = { contract_name: contract.contract_name };
          }
          return acc;
        },
        {} as Record<string, { contract_name: string }>,
      );

    let newAbis: Array<TypedAbiElement> = [];
    let newContractMap: Record<
      string,
      {
        contract_name: string;
      }
    > = {};

    if (!!abis) {
      newAbis = [...newAbis, ...abis];
    }
    if (!!fetchedAbis) {
      /**
       * @TODO Fix this, currently it's a bit of a hack
       */
      newAbis = [...newAbis, ...(fetchedAbis as unknown as TypedAbiElement[])];
    }

    if (!!contract_map) {
      newContractMap = { ...newContractMap, ...contract_map };
    }

    if (!!fetchedContractMap) {
      newContractMap = { ...newContractMap, ...fetchedContractMap };
    }

    const res = decodeActions({
      chain_id,
      script,
      abis: newAbis,
      contract_map: newContractMap,
    });

    if (!!res.actions) {
      data = res.actions;
    }
  }

  return {
    ...contractsProps,
    data,
  };
};

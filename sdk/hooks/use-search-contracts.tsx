/**
 * @TODO Find a way to fix the error of type not being found
 */
// @ts-ignore
import type { SortingState } from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import {
  type ContractFilter,
  searchContractsQueryOptions,
  type TypedContract,
} from "@/sdk/queries";
import { useRoycoClient, type RoycoClient } from "@/sdk/client";

export const useSearchContracts = ({
  sorting,
  filters,
  searchKey,
  pageIndex = 0,
}: {
  sorting: SortingState;
  filters: ContractFilter[];
  searchKey?: string;
  pageIndex?: number;
})  => {
  let data = [];
  let count = 0;
  let totalPages = 0;

  const client: RoycoClient = useRoycoClient();

  const props = useQuery(
    searchContractsQueryOptions(client, sorting, filters, searchKey, pageIndex),
  );

  if (
    !props.isLoading &&
    !props.isRefetching &&
    !props.isError &&
    !!props.data &&
    !!props.data.data
  ) {
    // @ts-ignore
    data = props.data.data;
  } else if (props.data === null) {
    data = [];
  }

  if (props.data && props.data.count) {
    count = props.data.count;
  }

  totalPages = Math.ceil(count / 10);

  return {
    ...props,
    data,
    count,
    totalPages,
  };
};

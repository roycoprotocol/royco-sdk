"use client";

import { useRoycoClient, type RoycoClient } from "@/sdk/client";
import { getEnrichedRoycoStatsQueryOptions } from "@/sdk/queries";
import { useQuery } from "@tanstack/react-query";
import type { CustomTokenData } from "@/sdk/types";

export const useEnrichedRoycoStats = ({
  custom_token_data,
  testnet = false,
}: {
  custom_token_data?: CustomTokenData;
  testnet?: boolean;
} = {}) => {
  const client: RoycoClient = useRoycoClient();

  return useQuery({
    ...getEnrichedRoycoStatsQueryOptions(client, custom_token_data, testnet),
  });
};

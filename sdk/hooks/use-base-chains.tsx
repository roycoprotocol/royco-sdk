import { SupportedChainlist } from "@/sdk/constants";

export const useBaseChains = ()  => {
  const data = SupportedChainlist.sort((a, b) => a.name.localeCompare(b.name));

  return { data };
};

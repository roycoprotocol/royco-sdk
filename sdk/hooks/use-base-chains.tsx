import {
  BerachainMainnet,
  BerachainTestnet,
  SupportedChainlist,
} from "@/sdk/constants";

export const useBaseChains = () => {
  const hiddenChains: number[] = [BerachainTestnet.id, BerachainMainnet.id];

  const data = SupportedChainlist.sort((a, b) =>
    a.name.localeCompare(b.name),
  ).filter((chain) => !hiddenChains.includes(chain.id));

  return { data };
};

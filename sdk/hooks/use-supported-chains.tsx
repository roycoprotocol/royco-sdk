import { SupportedChainMap, type SupportedChain } from "@/sdk/constants";

export type UseSupportedChainsReturnType = {
  data: SupportedChain[];
  map: typeof SupportedChainMap;
};

export const useSupportedChains = ({
  testnet = false,
}: {
  testnet?: boolean;
} = {}): UseSupportedChainsReturnType => {
  const data = Object.values(SupportedChainMap)
    .filter((chain) => {
      if (testnet === true) {
        return true;
      } else {
        if (chain.testnet === undefined) {
          return true;
        } else {
          return chain.testnet === testnet;
        }
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return { data, map: SupportedChainMap };
};

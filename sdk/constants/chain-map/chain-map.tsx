import { defineChain } from "viem";
import {
  sepolia as ethereumSepolia,
  mainnet as ethereumMainnet,
  arbitrum as arbitrumOne,
  base,
  corn,
  plume,
  sonic,
} from "viem/chains";
import { type Chain } from "viem/chains";

export type SupportedChain = Chain & {
  image: string;
  symbol: string;
};

export const EthereumSepolia = {
  ...ethereumSepolia,
  image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  symbol: "SETH",
};

export const EthereumMainnet = {
  ...ethereumMainnet,
  image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  symbol: "ETH",
};

export const ArbitrumOne = {
  ...arbitrumOne,
  image: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg",
  symbol: "ARB",
};

export const Base = {
  ...base,
  image: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  symbol: "BASE",
};

export const Corn = {
  ...corn,
  name: "Corn",
  image:
    "https://pbs.twimg.com/profile_images/1838599679321182208/igqD6b-Q_400x400.jpg",
  symbol: "CORN",
};

export const Plume = {
  ...plume,
  name: "Plume",
  image:
    "https://pbs.twimg.com/profile_images/1854933222569975808/no3lt9ZL_400x400.jpg",
  symbol: "PLUME",
};

export const Sonic = {
  ...sonic,
  name: "Sonic",
  image: "https://icons.llamao.fi/icons/chains/rsz_sonic.jpg",
  symbol: "SONIC",
};

export const BerachainTestnet = defineChain({
  id: 80000,
  name: "Berachain cArtio",
  nativeCurrency: {
    name: "BERA Token",
    symbol: "BERA",
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11 ",
      blockCreated: 121028,
    },
  },
  rpcUrls: {
    default: { http: ["https://app.royco.org/api/rpc/80000"] },
  },
  blockExplorers: {
    default: {
      name: "Berascan",
      url: "https://80000.testnet.routescan.io",
    },
  },
  testnet: true,
  image:
    "https://pbs.twimg.com/profile_images/1775162753499508736/2XBUzQhl_400x400.jpg",
  symbol: "CBERA",
});

export const BerachainMainnet = defineChain({
  id: 80094,
  name: "Berachain",
  nativeCurrency: {
    name: "BERA Token",
    symbol: "BERA",
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11 ",
      blockCreated: 0,
    },
  },
  rpcUrls: {
    default: { http: ["https://app.royco.org/api/rpc/80094"] },
  },
  blockExplorers: {
    default: {
      name: "Berascan",
      url: "https://80094.routescan.io",
    },
  },
  image:
    "https://pbs.twimg.com/profile_images/1775162753499508736/2XBUzQhl_400x400.jpg",
  symbol: "BERA",
});

export const SupportedChainMap: Record<number, SupportedChain> = {
  [ethereumSepolia.id]: EthereumSepolia,
  [ethereumMainnet.id]: EthereumMainnet,
  [arbitrumOne.id]: ArbitrumOne,
  [base.id]: Base,
  [corn.id]: Corn,
  [plume.id]: Plume,
  [sonic.id]: Sonic,
  [BerachainTestnet.id]: BerachainTestnet,
  [BerachainMainnet.id]: BerachainMainnet,
};

export const SupportedChainlist = Object.values(SupportedChainMap);

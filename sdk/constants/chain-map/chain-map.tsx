import { defineChain } from "viem";
import {
  sepolia as ethereumSepolia,
  mainnet as ethereumMainnet,
  arbitrum as arbitrumOne,
  base,
  corn,
  sonic,
  berachain,
  berachainTestnet,
  plumeMainnet,
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
  ...plumeMainnet,
  name: "Plume",
  image:
    "https://pbs.twimg.com/profile_images/1854933222569975808/no3lt9ZL_400x400.jpg",
  symbol: "PLUME",
  contracts: {
    multicall3: {
      address: "0xf9da0ef6635f6134d9d1b7eae025159d26ce5838",
      blockCreated: 4150,
    },
  } as const,
};

export const Sonic = {
  ...sonic,
  name: "Sonic",
  image: "https://i.ibb.co/8L917D49/Vector-2x.png",
  symbol: "SONIC",
};

export const BerachainTestnet = defineChain({
  ...berachainTestnet,
  id: 80069,
  testnet: true,
  image:
    "https://pbs.twimg.com/profile_images/1775162753499508736/2XBUzQhl_400x400.jpg",
  symbol: "ABERA",
});

export const BerachainMainnet = defineChain({
  ...berachain,
  name: "Berachain",
  image:
    "https://pbs.twimg.com/profile_images/1775162753499508736/2XBUzQhl_400x400.jpg",
  symbol: "BERA",
});

export const hyperevm = defineChain({
  id: 999,
  name: "Hyper EVM",
  nativeCurrency: {
    name: "HYPE",
    symbol: "HYPE",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://rpc.hyperliquid.xyz/evm"],
      webSocket: ["wss://rpc.hyperliquid.xyz/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Hyper Explorer",
      url: "https://hyperliquid.cloud.blockscout.com",
      apiUrl: "https://hyperliquid.cloud.blockscout.com/api",
    },
  },
});

export const Hyperevm = {
  ...hyperevm,
  name: "Hyper EVM",
  image:
    "https://pbs.twimg.com/profile_images/1646991609416806408/vKLEZxhh_400x400.png",
  symbol: "HYPE",
};

export const SupportedChainMap: Record<number, SupportedChain> = {
  [ethereumSepolia.id]: EthereumSepolia,
  [ethereumMainnet.id]: EthereumMainnet,
  [arbitrumOne.id]: ArbitrumOne,
  [base.id]: Base,
  [corn.id]: Corn,
  [Plume.id]: Plume,
  [sonic.id]: Sonic,
  [BerachainTestnet.id]: BerachainTestnet,
  [BerachainMainnet.id]: BerachainMainnet,
};

export const SupportedChainlist = Object.values(SupportedChainMap);

import { defineChain } from "viem";
import {
  sepolia as ethereumSepolia,
  mainnet as ethereumMainnet,
  arbitrum as arbitrumOne,
  base,
  corn,
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

const plume = defineChain({
  sourceId: 1,
  id: 98_865,
  name: "Plume Mainnet",
  nativeCurrency: {
    name: "Plume Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.plumenetwork.xyz"],
      webSocket: ["wss://rpc.plumenetwork.xyz"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://phoenix-explorer.plumenetwork.xyz",
      apiUrl: "https://phoenix-explorer.plumenetwork.xyz/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 48577,
    },
  },
});

export const Plume = {
  ...plume,
  name: "Plume",
  image:
    "https://pbs.twimg.com/profile_images/1854933222569975808/no3lt9ZL_400x400.jpg",
  symbol: "PLUME",
};

export const SupportedChainMap: Record<number, SupportedChain> = {
  [ethereumSepolia.id]: EthereumSepolia,
  [ethereumMainnet.id]: EthereumMainnet,
  [arbitrumOne.id]: ArbitrumOne,
  [base.id]: Base,
  [corn.id]: Corn,
  [plume.id]: Plume,
};

export const SupportedChainlist = Object.values(SupportedChainMap);

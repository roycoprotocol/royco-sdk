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

const EthereumSepolia = {
  ...ethereumSepolia,
  image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  symbol: "SETH",
};

const EthereumMainnet = {
  ...ethereumMainnet,
  image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  symbol: "ETH",
};

const ArbitrumOne = {
  ...arbitrumOne,
  image: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg",
  symbol: "ARB",
};

const Base = {
  ...base,
  image: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  symbol: "BASE",
};

const Corn = {
  ...corn,
  name: "Corn",
  image:
    "https://pbs.twimg.com/profile_images/1838599679321182208/igqD6b-Q_400x400.jpg",
  symbol: "CORN",
};

const plume = defineChain({
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
      url: "https://explorer.plumenetwork.xyz",
      apiUrl: "https://explorer.plumenetwork.xyz/api",
    },
  },
  sourceId: 1,
});

const Plume = {
  ...plume,
  name: "Plume",
  image:
    "https://pbs.twimg.com/profile_images/1854933222569975808/no3lt9ZL_400x400.jpg",
  symbol: "PLUMS",
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

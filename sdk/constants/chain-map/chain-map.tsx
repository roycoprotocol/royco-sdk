import {
  sepolia as ethereumSepolia,
  mainnet as ethereumMainnet,
  arbitrumSepolia,
  arbitrum as arbitrumOne,
  baseSepolia,
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

const ArbitrumSepolia = {
  ...arbitrumSepolia,
  image: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg",
  symbol: "SARB",
};

const ArbitrumOne = {
  ...arbitrumOne,
  image: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg",
  symbol: "ARB",
};

const BaseSepolia = {
  ...baseSepolia,
  image: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  symbol: "SBASE",
};

const Base = {
  ...base,
  image: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  symbol: "BASE",
};

const Corn = {
  ...corn,
  image:
    "https://pbs.twimg.com/profile_images/1838599679321182208/igqD6b-Q_400x400.jpg",
  symbol: "CORN",
};

export const SupportedChainMap: Record<number, SupportedChain> = {
  [ethereumSepolia.id]: EthereumSepolia,
  [ethereumMainnet.id]: EthereumMainnet,
  // [arbitrumSepolia.id]: ArbitrumSepolia,
  [arbitrumOne.id]: ArbitrumOne,
  // [baseSepolia.id]: BaseSepolia,
  [base.id]: Base,
  [corn.id]: Corn,
};

export const SupportedChainlist = Object.values(SupportedChainMap);

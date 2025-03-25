import { Address } from "abitype";

export const ContractAddresses = {
  WrappedVault: "0xb0a3960b115e0999f33e8afd4a11f16e04e2bf33",
  WrappedVaultFactory: "0xda0a91f0fcc2a7c1922165a28038d89babe8ccfa",
  PointsFactory: "0xc0bd79dea95c1e1c474ce29d489e81dffcf15d49",
  RecipeMarketHub: "0x6af057b1c423d108ab710d6f4e3e46f3536787fd",
  VaultMarketHub: "0x595ee728f3b8f5e937f6a21fe20f929dd8e301fc",
  WeirollWallet: "0x40a1c08084671e9a799b73853e82308225309dc0",
  WeirollWalletHelper: "0x07899ac8be7462151d6515fcd4773dd9267c9911",
} as Record<string, Address>;

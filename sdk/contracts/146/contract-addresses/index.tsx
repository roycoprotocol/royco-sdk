import { Address } from "abitype";

export const ContractAddresses = {
  WrappedVault: "0xb0a3960b115e0999f33e8afd4a11f16e04e2bf33",
  WrappedVaultFactory: "0x7212d98a88d44f714fd29dd980cb846be8e7491a",
  PointsFactory: "0xd3b5bed62038d520fe659c01b03e2727377c8b8d",
  RecipeMarketHub: "0xfcc593ad3705ebcd72ec961c63eb484be795bdbd",
  VaultMarketHub: "0x1e3fcccbafdbdf3cb17b7470c8a6cc64eb5f94a2",
  WeirollWallet: "0x40a1c08084671e9a799b73853e82308225309dc0",
  WeirollWalletHelper: "0x07899ac8be7462151d6515fcd4773dd9267c9911",
} as Record<string, Address>;

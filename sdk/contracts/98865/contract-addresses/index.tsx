import { NULL_ADDRESS } from "@/sdk/constants";
import { Address } from "abitype";

export const ContractAddresses = {
  WrappedVault: "0x3c44c20377e252567d283dc7746d1bea67eb3e66",
  WrappedVaultFactory: "0x476d38677c25c3759e527b3d87ce95b5be5c0195",
  PointsFactory: "0x86cbefba5cef451f9ff5bb76e0da6ea845a05201",
  RecipeMarketHub: "0xda2e8a79b09c8cf07772acf0105419342e40b6c3",
  VaultMarketHub: "0xa8750939e2bb0fbf6232bdeb6eb9d09e2d3e60ee",
  WeirollWallet: "0x40a1c08084671e9a799b73853e82308225309dc0",
  WeirollWalletHelper: "0x07899ac8be7462151d6515fcd4773dd9267c9911",
} as Record<string, Address>;

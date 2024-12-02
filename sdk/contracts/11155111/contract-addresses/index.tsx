import { Address } from "abitype";

export const ContractAddresses = {
  WrappedVault: "0x3c44c20377e252567d283dc7746d1bea67eb3e66",
  WrappedVaultFactory: "0x75e502644284edf34421f9c355d75db79e343bca",
  PointsFactory: "0x19112adbdafb465ddf0b57ecc07e68110ad09c50",
  RecipeMarketHub: "0x61e61db00b2cc8a9bc04b2aa5e52730776542d87",
  VaultMarketHub: "0x1a422de5ff8ae67880f7ed5a907c3ec68a032306",
  WeirollWallet: "0x40a1c08084671e9a799b73853e82308225309dc0",
  WeirollWalletHelper: "0x07899ac8be7462151d6515fcd4773dd9267c9911",
} as Record<string, Address>;

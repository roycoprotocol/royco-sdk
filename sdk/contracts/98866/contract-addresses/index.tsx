import { NULL_ADDRESS } from "@/sdk/constants";
import { Address } from "abitype";

export const ContractAddresses = {
  WrappedVault: "0xb0a3960b115e0999f33e8afd4a11f16e04e2bf33",
  WrappedVaultFactory: "0x9ec20b1999b92c4235214f4b2922cf9e6a349b31",
  PointsFactory: "0x213774c22ff5a724c0668818333e4cf8aea00f76",
  RecipeMarketHub: "0x027ef18525876138bec202aa4411538ce4b2f4ca",
  VaultMarketHub: "0x520bd73d143a1a9395728aa34b81695ff7e2d6aa",
  WeirollWallet: "0x40a1c08084671e9a799b73853e82308225309dc0",
  WeirollWalletHelper: "0x07899ac8be7462151d6515fcd4773dd9267c9911",
} as Record<string, Address>;

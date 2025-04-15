import { Abi } from "viem";
import { RecipeMarketHubAbi } from "./RecipeMarketHub";
import { VaultMarketHubAbi } from "./VaultMarketHub";
import { WeirollWalletAbi } from "./WeirollWallet";
import { WeirollWalletHelperAbi } from "./WeirollWalletHelper";
import { WrappedVaultAbi } from "./WrappedVault";
import { WrappedVaultFactoryAbi } from "./WrappedVaultFactory";
import { erc20Abi } from "viem";
import { erc4626Abi } from "viem";

export const AbiMap = new Map<string, Abi>([
  ["RecipeMarketHub", RecipeMarketHubAbi],
  ["VaultMarketHub", VaultMarketHubAbi],
  ["WeirollWallet", WeirollWalletAbi],
  ["WeirollWalletHelper", WeirollWalletHelperAbi],
  ["WrappedVault", WrappedVaultAbi],
  ["WrappedVaultFactory", WrappedVaultFactoryAbi],
  ["Erc20", erc20Abi],
  ["Erc4626", erc4626Abi],
]);

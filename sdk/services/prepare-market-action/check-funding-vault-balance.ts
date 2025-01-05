import { BigNumber } from "ethers";
import { NULL_ADDRESS } from "@/sdk/constants";
import {
  getWalletTokenBalanceQueryFunction,
  getCompleteMarketQueryFunction,
  getVaultTokenBalanceQueryFunction,
} from "@/sdk/queries";

export const checkFundingVaultBalance = ({
  quantity,
  funding_vault,
  walletTokenBalance,
  vaultTokenBalance,
  completeMarket,
}: {
  quantity: string;
  funding_vault: string;
  walletTokenBalance: Awaited<
    ReturnType<typeof getWalletTokenBalanceQueryFunction>
  > | null;
  vaultTokenBalance: Awaited<
    ReturnType<typeof getVaultTokenBalanceQueryFunction>
  > | null;
  completeMarket: Awaited<
    ReturnType<typeof getCompleteMarketQueryFunction>
  > | null;
}) => {
  // Check balance based on funding source
  if (funding_vault === NULL_ADDRESS && !!walletTokenBalance) {
    // Source of funds is wallet
    if (BigNumber.from(walletTokenBalance.raw_amount).lt(quantity)) {
      throw new Error("Insufficient balance in wallet");
    }
  } else if (funding_vault !== NULL_ADDRESS && !!vaultTokenBalance) {
    // Source of funds is vault
    if (
      vaultTokenBalance?.contract_address !==
      completeMarket?.input_token_data.contract_address
    ) {
      throw new Error("Vault token does not match market token");
    }

    if (BigNumber.from(vaultTokenBalance.raw_amount ?? "0").lt(quantity)) {
      throw new Error("Insufficient balance in vault");
    }
  }
};

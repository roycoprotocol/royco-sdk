import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xec783a68452e3fc44de0f5c9769c312be9ed17fbb4594f635eea88230ec68c28`,
  name: `Deposit scUSD into RFX Vaults`,
  description: `Deposit scUSD into the RFX scUSD Vault to obtain RFX SLV tokens and earn fees from leverage trading. The SLV allocates liquidity to all scUSD markets on RFX, and automatically rebalances liquidity to the best performing markets with 0 impermanent loss. Traders borrow liquidity from the scUSD Vault to execute trades in exchange for fees.`,
  is_verified: true,
});

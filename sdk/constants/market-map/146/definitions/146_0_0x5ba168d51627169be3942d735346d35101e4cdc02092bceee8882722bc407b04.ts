import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x5ba168d51627169be3942d735346d35101e4cdc02092bceee8882722bc407b04`,
  name: `Deposit wS into RFX Vaults`,
  description: `Deposit wS into the RFX wS Vault to obtain RFX SLV tokens and earn fees from leverage trading. The SLV allocates liquidity to all wS markets on RFX, and automatically rebalances liquidity to the best performing markets with 0 impermanent loss. Traders borrow liquidity from the wS Vault to execute trades in exchange for fees.`,
  is_verified: false,
});
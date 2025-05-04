import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xd521138f8028d18faa22b48577216c1bfd46b2a1ac7bd0d253dea84b24cd1938`,
  name: `Deposit wS into RFX Vaults`,
  description: `Deposit wS into the RFX wS Vault to obtain RFX SLV tokens and earn fees from leverage trading. The SLV allocates liquidity to all wS markets on RFX, and automatically rebalances liquidity to the best performing markets with 0 impermanent loss. Traders borrow liquidity from the wS Vault to execute trades in exchange for fees.`,
  is_verified: true,
});

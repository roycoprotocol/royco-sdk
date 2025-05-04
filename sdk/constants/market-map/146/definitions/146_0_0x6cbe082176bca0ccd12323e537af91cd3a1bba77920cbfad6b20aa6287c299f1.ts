import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x6cbe082176bca0ccd12323e537af91cd3a1bba77920cbfad6b20aa6287c299f1`,
  name: `Deposit scUSD into RFX Vaults`,
  description: `Deposit scUSD into the RFX scUSD Vault to obtain RFX SLV tokens and earn fees from leverage trading. The SLV allocates liquidity to all scUSD markets on RFX, and automatically rebalances liquidity to the best performing markets with 0 impermanent loss. Traders borrow liquidity from the scUSD Vault to execute trades in exchange for fees.`,
  is_verified: true,
});

import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `11155111_0_0x98e2e674a5dbf76b25a89b9f2e38f1d918ae77612be6743f430d38765437f942`,
  name: `Predeposit - Provide stgUSDC-USDT Liquidity on Stratus Exchange`,
  description: `Deposit stgUSDC on Sepolia testnet and automatically provide liquidity to the stgUSDC-USDT pool. Stratus native zap mechanism will handle the single-sided entry by optimally converting a portion of your stgUSDC to USDT and establishing a concentrated liquidity position in a single transaction.

Earn trading fees from the stgUSDC-USDT pool proportional to your liquidity contribution, plus receive Stratus Points as additional incentives for participating in this market.`,
  is_verified: false,
});
import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x7d1f2a66eabf9142dd30d1355efcbfd4cfbefd2872d24ca9855641434816a525`,
  name: `Deposit USDC into Rings to Mint and Stake scUSD`,
  description: `When USDC is deposited in the market it is used to mint scUSD, staked and auto-compounds while collecting points. There is a 5-day redemption period for withdrawals`,
  is_verified: true,
});

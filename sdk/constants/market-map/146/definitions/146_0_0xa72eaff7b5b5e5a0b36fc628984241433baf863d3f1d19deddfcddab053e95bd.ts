import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0xa72eaff7b5b5e5a0b36fc628984241433baf863d3f1d19deddfcddab053e95bd`,
  name: `Rings simple USDC vault`,
  description: `When USDC is deposited in the market, it is used to mint scUSD, staked and auto-compounds while collecting points. There is a 5-day redemption period for withdrawals.`,
  is_verified: false,
});

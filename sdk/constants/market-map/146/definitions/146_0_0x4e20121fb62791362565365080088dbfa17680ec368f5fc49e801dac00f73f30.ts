import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x4e20121fb62791362565365080088dbfa17680ec368f5fc49e801dac00f73f30`,
  name: `LP into the wstkscETH pool on Pendle`,
  description: `The Pendle wstkscETH LP token is supplied to the market as proof that you&#x27;ve provided liquidity to the Pendle wstkscETH pool. Depositors may exit at anytime, however withdrawing before the end of the 30-day period will forfeit all incentives earned to date. The maturity period for this market is May 28, 2025 and this market will stop accepting new deposits 30 days prior to this date.`,
  is_verified: false,
});
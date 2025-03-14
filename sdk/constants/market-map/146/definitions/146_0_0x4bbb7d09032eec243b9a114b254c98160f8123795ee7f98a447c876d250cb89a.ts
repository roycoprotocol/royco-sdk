import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x4bbb7d09032eec243b9a114b254c98160f8123795ee7f98a447c876d250cb89a`,
  name: `LP into the wstkscUSD pool on Pendle`,
  description: `The Pendle wstkscUSD LP token is supplied to the market as proof that you&#x27;ve provided liquidity to the Pendle wstkscUSD pool. Depositors may exit at anytime, however withdrawing before the end of the 30-day period will forfeit all incentives earned to date. The maturity period for this market is May 28, 2025 and this market will stop accepting new deposits 30 days prior to this date.`,
  is_verified: false,
});

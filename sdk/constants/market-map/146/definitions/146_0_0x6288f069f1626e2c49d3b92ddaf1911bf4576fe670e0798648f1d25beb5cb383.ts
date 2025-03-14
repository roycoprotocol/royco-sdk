import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x6288f069f1626e2c49d3b92ddaf1911bf4576fe670e0798648f1d25beb5cb383`,
  name: `LP into the wstkscUSD pool on Pendle`,
  description: `The Pendle wstkscUSD LP token is supplied to the market as proof that you&#x27;ve provided liquidity to the Pendle wstkscUSD pool. Depositors may exit at anytime, however withdrawing before the end of the 30-day period will forfeit all incentives earned to date. The maturity period for this market is May 28, 2025 and this market will stop accepting new deposits 30 days prior to this date.`,
  is_verified: false,
});
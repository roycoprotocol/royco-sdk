import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98866_0_0x66a4f7333d14307e5559b0ceb3c9f122459b7efaa77b2e4428c1ebd355a20cb2`,
  name: `Leverage pETH on Mystic Finance`,
  description: `Deposit pETH on Mystic and borrow WETH with it, which will then be swapped for pETH on Rooster and used to borrow pUSD again. This is repeated 3 times, giving you 3x leverage on pETH and the corresponding leveraged yield and incentives. 90 days lockup.`,
  is_verified: false,
});
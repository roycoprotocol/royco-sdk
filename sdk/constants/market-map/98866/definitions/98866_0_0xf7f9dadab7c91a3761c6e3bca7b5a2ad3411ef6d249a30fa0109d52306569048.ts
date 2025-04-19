import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98866_0_0xf7f9dadab7c91a3761c6e3bca7b5a2ad3411ef6d249a30fa0109d52306569048`,
  name: `Leverage pETH on Mystic Finance`,
  description: `Deposit pETH on Mystic and borrow pUSD with it, which will then be swapped for pETH on Rooster and used to borrow pUSD again. This is repeated 3 times, giving you 3x leverage on pETH and the corresponding leveraged yield and incentives. 90 days lockup.`,
  is_verified: false,
});
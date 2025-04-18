import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98866_0_0x2807a6b682560c9b110d66ed1598accc1c0e043fad91d55a6790a00c942f08e9`,
  name: `Leverage pETH on Mystic Finance`,
  description: `Deposit pETH on Mystic and borrow pUSD with it, which will then be swapped for pETH on Rooster and used to borrow pUSD again. This is repeated 3 times, giving you 3x leverage on pETH and the corresponding leveraged yield and incentives. 90 days lockup.`,
  is_verified: false,
});
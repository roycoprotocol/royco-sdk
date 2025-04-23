import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98866_0_0x20c8574204a7c67aa49f343cf95b758b50b1616cbacf2d06d136cd75d8e19bb8`,
  name: `Leverage nTBILL on Mystic Finance`,
  description: `Deposit nTBILL on Mystic and borrow pUSD with it, which will then be swapped for nTBILL on Rooster and used to borrow pUSD again. This is repeated 3 times, giving you 3x leverage on nTBILL and the corresponding leveraged yield and incentives. 90 days lockup.`,
  is_verified: false,
});

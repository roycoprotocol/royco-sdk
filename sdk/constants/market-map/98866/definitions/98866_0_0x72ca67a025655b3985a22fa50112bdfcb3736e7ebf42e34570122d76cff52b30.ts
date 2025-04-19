import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `98866_0_0x72ca67a025655b3985a22fa50112bdfcb3736e7ebf42e34570122d76cff52b30`,
  name: `Leverage pETH on Mystic Finance`,
  description: `Deposit pETH on Mystic and borrow pUSD with it, which will then be swapped for pETH on Rooster and used to borrow pUSD again. This is repeated 3 times, giving you 3x leverage on pETH and the corresponding leveraged yield and incentives. 90 days lockup.`,
  is_verified: false,
});
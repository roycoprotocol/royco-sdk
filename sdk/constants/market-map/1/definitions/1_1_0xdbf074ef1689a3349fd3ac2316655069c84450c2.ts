import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_1_0xdbf074ef1689a3349fd3ac2316655069c84450c2`,
  name: `Lend USDC on Euler Prime`,
  description: `When USDC is supplied to the market, depositors earn extra rEUL rewards. Reward EUL converts to 1:1 with EUL over a period of 6 months. For more information, read here: https://forum.euler.finance/t/reward-eul-reul/1133. `,
  is_verified: true,
});

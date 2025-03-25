import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x9953a1d25df1ece15b0ef05546c2c22ac61d4551d1e8d2e8af6ec938a84418e0`,
  name: `Deposit WETH to Plaza Finance`,
  description: `Depositing WETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https:&#x2F;&#x2F;docs.plaza.finance&#x2F;plaza-points-pp&#x2F;season-1-guide`,
  is_verified: false,
});
import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x57f1a13d5dc3d192954c7aded801d6ab4ca403b6526defd2f6f2f328995bcdbd`,
  name: `Deposit ezETH to Plaza Finance`,
  description: `Depositing ezETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https:&#x2F;&#x2F;docs.plaza.finance&#x2F;plaza-points-pp&#x2F;season-1-guide`,
  is_verified: false,
});
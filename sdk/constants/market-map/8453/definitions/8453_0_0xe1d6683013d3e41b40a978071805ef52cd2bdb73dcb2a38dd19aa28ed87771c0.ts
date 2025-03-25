import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0xe1d6683013d3e41b40a978071805ef52cd2bdb73dcb2a38dd19aa28ed87771c0`,
  name: `Deposit wrsETH to Plaza Finance`,
  description: `Depositing wrsETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https:&#x2F;&#x2F;docs.plaza.finance&#x2F;plaza-points-pp&#x2F;season-1-guide`,
  is_verified: false,
});

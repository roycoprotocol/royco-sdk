import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x43314ce58840f0c26bf2fbb2135ea86051b391afe186d42186cccef55e318e10`,
  name: `Deposit wstETH to Plaza Finance`,
  description: `Depositing wstETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https:&#x2F;&#x2F;docs.plaza.finance&#x2F;plaza-points-pp&#x2F;season-1-guide`,
  is_verified: true,
});

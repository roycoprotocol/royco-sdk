import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0xa8c77e0b4883c901f01d352ecdc1a5404b7ec83bcfb2a2fa3d1960a682c9d3dd`,
  name: `Deposit weETH to Plaza Finance`,
  description: `Depositing weETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https://docs.plaza.finance/plaza-points-pp/season-1-guide.`,
  is_verified: false,
});

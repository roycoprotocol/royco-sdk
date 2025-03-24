import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0xab2d51cdd994702ddc1397eb7a1400da6949781ef0894f35161c3248b27bcc1b`,
  name: `Deposit wrsETH to Plaza Finance`,
  description: `Depositing wrsETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https://docs.plaza.finance/plaza-points-pp/season-1-guide.`,
  is_verified: false,
});

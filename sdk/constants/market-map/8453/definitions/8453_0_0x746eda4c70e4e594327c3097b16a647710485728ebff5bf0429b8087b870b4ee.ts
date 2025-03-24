import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0x746eda4c70e4e594327c3097b16a647710485728ebff5bf0429b8087b870b4ee`,
  name: `Deposit wstETH to Plaza Finance`,
  description: `Depositing wstETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https://docs.plaza.finance/plaza-points-pp/season-1-guide
`,
  is_verified: false,
});

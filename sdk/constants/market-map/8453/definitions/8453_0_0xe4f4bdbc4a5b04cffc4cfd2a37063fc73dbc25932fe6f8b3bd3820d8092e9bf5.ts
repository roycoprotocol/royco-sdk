import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `8453_0_0xe4f4bdbc4a5b04cffc4cfd2a37063fc73dbc25932fe6f8b3bd3820d8092e9bf5`,
  name: `Deposit cbETH to Plaza Finance`,
  description: `Depositing wstETH to Plaza earns Plaza Points (25% APY @ $50m FDV) on top of the 3-4% inherent staking yield. Your supplied assets sit untouched in a Plaza deposit contract during the deposit period, and then convert to 70% bondETH and 30% levETH upon protocol launch (in aggregate equal exposure to ETH). Your Plaza incentives have no lockup at the generation event. More information can be found at: https://docs.plaza.finance/plaza-points-pp/season-1-guide
`,
  is_verified: false,
});

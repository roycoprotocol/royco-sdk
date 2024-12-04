import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0xf798e250e1ded9f21b4857350df170dfac9e6a85d3d4cacda732352faa7b23f8",
  name: "TEST MARKET Swap USDC for GHO and Stake ",
  description: `Swap USDC for GHO on Balancer V2 with 0.2% slippage, then stake for stkGHO for 20 minutes`,
  is_verified: false,
});

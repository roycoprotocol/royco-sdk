import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0x83c459782b2ff36629401b1a592354fc085f29ae00cf97b803f73cac464d389b",
  name: "Swap USDC to stkGHO for 1 mo",
  description: `Swap USDC for GHO on Balancer V2, receiving a minimum of .999 GHO per USDC, then stake the GHO for stkGHO and lock for 1 month.`,
  is_verified: true,
});

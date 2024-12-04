
import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0x54cdb03cefb229a62f3d7a20c4fb929df54ab18a4a48ca1ae45763848bdf27ba",
  name: "Swap USDC for GHO on Balancer V2 then stake it for stkGHO",
  description: `In this market we want the user to swap their USDC into GHO on Balancer v2 for a minimum of 0.999 GHO per USDC then stake it for stkGHO in Aave's safety module.
`,
  is_verified: false,
});

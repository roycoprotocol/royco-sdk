import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xd77d3e3e075394a6c94a8c83dab114bb7266b96c5234e4a98476f41339029c30`,
  name: `Beraborrow beraETH Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit beraETH into Boyco. beraETH is bridged &amp; deposited into Beraborrow. beraETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

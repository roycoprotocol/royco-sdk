import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x6b3dfac03cea102e59d2d5711088f3001782e07239dcc90f274dd9762220c49a`,
  name: `Beraborrow ylrsETH Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit ylrsETH into Boyco. ylrsETH is bridged &amp; deposited into Beraborrow. ylrsETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
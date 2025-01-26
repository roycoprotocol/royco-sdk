import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xb9f307d83c78d09a134aac7713821aab8e1da2404b895db66f0975135dd5006e`,
  name: `Beraborrow WETH Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit WETH into Boyco. WETH is bridged &amp; deposited into Beraborrow. WETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

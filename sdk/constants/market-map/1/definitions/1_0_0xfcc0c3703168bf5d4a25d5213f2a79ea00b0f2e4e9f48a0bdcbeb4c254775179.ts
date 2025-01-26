import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xfcc0c3703168bf5d4a25d5213f2a79ea00b0f2e4e9f48a0bdcbeb4c254775179`,
  name: `Beraborrow Universal BTC Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit Universal BTC into Boyco. Universal BTC is bridged &amp; deposited into Beraborrow. Universal BTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

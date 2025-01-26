import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xfef8ead03d79cf7cbe6f73c8d1136f8c84f6cf6ed9bc208719e7fcee807cb336`,
  name: `Beraborrow RSETH Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit RSETH into Boyco. RSETH is bridged &amp; deposited into Beraborrow. RSETH is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

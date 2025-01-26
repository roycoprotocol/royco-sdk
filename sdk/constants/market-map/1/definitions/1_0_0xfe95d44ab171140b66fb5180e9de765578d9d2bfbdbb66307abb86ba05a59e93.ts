import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xfe95d44ab171140b66fb5180e9de765578d9d2bfbdbb66307abb86ba05a59e93`,
  name: `Beraborrow pumpBTC Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit pumpBTC into Boyco. pumpBTC is bridged &amp; deposited into Beraborrow. pumpBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x28b337bd45eda5e2fc596bfe22320bef0af9da85d4c770d0fd03ddf72428c00a`,
  name: `Beraborrow SolvBTC Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit SolvBTC into Boyco. SolvBTC is bridged &amp; deposited into Beraborrow. SolvBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of Berachains Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

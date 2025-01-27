import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x54b4b37c355868591a91baed36a3c8083f6480ccb11145106d0dad912d7dffd2`,
  name: `Beraborrow SolvBTC.BBN Boyco`,
  description: `Single sided Liquid Stability Pool: Deposit SolvBTC.BBN into Boyco. SolvBTC.BBN is bridged &amp; deposited into Beraborrow. SolvBTC.BBN is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool. This is part of Berachains Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xb32d047eb63b5c2af537c2e4df6a09c40a50b75aefd83a928600241a4666b087`,
  name: `Beraborrow uniBTC Boyco`,
  description: `Single sided Liquid Stability Pool: Deposit uniBTC into Boyco. uniBTC is bridged &amp; deposited into Beraborrow. uniBTC is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool. This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
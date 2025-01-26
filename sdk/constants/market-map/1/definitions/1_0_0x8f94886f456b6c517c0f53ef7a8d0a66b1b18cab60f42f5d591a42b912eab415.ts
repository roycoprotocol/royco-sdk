import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x8f94886f456b6c517c0f53ef7a8d0a66b1b18cab60f42f5d591a42b912eab415`,
  name: `Beraborrow SolvBTC.BNN Boyco`,
  description: `Single sided Liquid Stability Pool:
Deposit SolvBTC.BNN into Boyco. SolvBTC.BNN is bridged &amp; deposited into Beraborrow. SolvBTC.BNN is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
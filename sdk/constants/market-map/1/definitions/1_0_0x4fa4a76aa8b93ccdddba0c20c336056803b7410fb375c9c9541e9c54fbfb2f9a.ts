import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x4fa4a76aa8b93ccdddba0c20c336056803b7410fb375c9c9541e9c54fbfb2f9a`,
  name: `Beraborrow ylBTCLST Boyco`,
  description: `Single sided Liquid Stability Pool: 
Deposit ylBTCLST into Boyco. ylBTCLST is bridged &amp; deposited into Beraborrow. ylBTCLST is then used to mint NECT at 300% collateral ratio, and then NECT is supplied into the Liquid Stability Pool.
This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
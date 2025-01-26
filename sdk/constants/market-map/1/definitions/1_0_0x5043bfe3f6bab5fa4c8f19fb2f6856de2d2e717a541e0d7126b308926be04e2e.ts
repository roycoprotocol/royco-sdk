import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x5043bfe3f6bab5fa4c8f19fb2f6856de2d2e717a541e0d7126b308926be04e2e`,
  name: `Supply USDe to Concrete x Ethena Vault`,
  description: `When USDe is supplied to this market, it is allocated across leading Berachain DEXs and lending applications such as Kodiak, Dolomite, and Beraborrow. The vault will also allocate to yield opportunities from leading protocols expanding to Berachain. This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

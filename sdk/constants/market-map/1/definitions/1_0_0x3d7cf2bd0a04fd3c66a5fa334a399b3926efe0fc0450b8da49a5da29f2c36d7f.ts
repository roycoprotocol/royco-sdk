import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x3d7cf2bd0a04fd3c66a5fa334a399b3926efe0fc0450b8da49a5da29f2c36d7f`,
  name: `Supply sUSDe to Concrete x Ethena Vault`,
  description: `When sUSDe is supplied to this market, it is allocated across leading Berachain DEXs and lending applications such as Kodiak, Dolomite, and Beraborrow. The vault will also allocate to yield opportunities from leading protocols expanding to Berachain. This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

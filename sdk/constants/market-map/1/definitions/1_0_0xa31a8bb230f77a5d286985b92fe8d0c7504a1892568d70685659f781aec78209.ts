import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xa31a8bb230f77a5d286985b92fe8d0c7504a1892568d70685659f781aec78209`,
  name: `Supply LBTC to Concrete x Lombard Vault`,
  description: `When LBTC is supplied to this market, it is allocated across leading Berachain DEXs and lending applications such as Kodiak and Dolomite. The vault will also allocate to yield opportunities from leading protocols expanding to Berachain. This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
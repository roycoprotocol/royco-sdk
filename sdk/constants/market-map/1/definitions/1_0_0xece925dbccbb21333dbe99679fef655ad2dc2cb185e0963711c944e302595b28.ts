import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xece925dbccbb21333dbe99679fef655ad2dc2cb185e0963711c944e302595b28`,
  name: `Supply WBTC to Concrete x Lombard Vault`,
  description: `When WBTC is supplied to this market, it is allocated across leading Berachain DEXs and lending applications such as Kodiak and Dolomite. The vault will also allocate to yield opportunities from leading protocols expanding to Berachain. This is part of the Berachain Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});

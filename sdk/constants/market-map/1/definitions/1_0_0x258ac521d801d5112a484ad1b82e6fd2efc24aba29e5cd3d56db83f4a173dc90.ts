import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x258ac521d801d5112a484ad1b82e6fd2efc24aba29e5cd3d56db83f4a173dc90`,
  name: `Supply beraETH on Dolomite`,
  description: `Supply beraETH into the Dolomite money market on Berachain. ETH supplied on Mainnet will be bridged to Berachain, then minted into beraETH. This asset will earn lending yield.`,
  is_verified: false,
  category: `boyco`,
});
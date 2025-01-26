import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x5f3eb887e8c46508efa707774636dbfab09eaf109d2c8d699917b273da8bcc04`,
  name: `Supply USDe into Concrete Vault`,
  description: `Concrete is a protocol building yield, money market, and derivatives strategies. Their Boyco Market is a vault that takes in assets to deploy on user’s behalf in the Berachain ecosystem. 

After mainnet, the vaults’ respective strategies will manage DeFi positions on various partner protocols that received liquidity commitments during the Boyco phase. These include providing DEX Liquidity as well as supplying into lending protocols.`,
  is_verified: false,
  category: `boyco`,
});
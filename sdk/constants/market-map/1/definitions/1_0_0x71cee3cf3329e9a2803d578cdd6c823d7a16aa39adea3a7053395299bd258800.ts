import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x71cee3cf3329e9a2803d578cdd6c823d7a16aa39adea3a7053395299bd258800`,
  name: `Supply USDC-NECT-HONEY LP into BurrBear`,
  description: `When USDC is deposited into the market: 1. It is bridged to Berachain mainnet 2. The funds are split: - 1&#x2F;3 is used in Beraborrow&#x27;s PSM Bond to mint NECT - 1&#x2F;3 is used to mint HONEY - 1&#x2F;3 remains as USDC 3. All funds are then deposited into BurrBear&#x27;s NECT&#x2F;USDC&#x2F;HONEY liquidity pool.`,
  is_verified: false,
  category: `boyco`,
});
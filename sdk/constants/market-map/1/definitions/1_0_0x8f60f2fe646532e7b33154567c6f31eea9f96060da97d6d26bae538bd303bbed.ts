import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x8f60f2fe646532e7b33154567c6f31eea9f96060da97d6d26bae538bd303bbed`,
  name: `BurrBear USDC-NECT-HONEY, Boyco`,
  description: `When USDC is deposited into the market:
1. It is bridged to Berachain mainnet
2. The funds are split:
   - 1&#x2F;3 is used in Beraborrow&#x27;s PSM Bond to mint NECT
   - 1&#x2F;3 is used to mint HONEY
   - 1&#x2F;3 remains as USDC
3. All funds are then deposited into BurrBear&#x27;s NECT&#x2F;USDC&#x2F;HONEY liquidity pool.`,
  is_verified: false,
  category: `boyco`,
});

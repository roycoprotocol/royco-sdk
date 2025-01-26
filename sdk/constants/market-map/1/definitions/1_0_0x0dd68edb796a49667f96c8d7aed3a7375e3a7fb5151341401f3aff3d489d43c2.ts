import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x0dd68edb796a49667f96c8d7aed3a7375e3a7fb5151341401f3aff3d489d43c2`,
  name: `BOYCO — USDC-NECT-HONEY`,
  description: `When USDC is deposited into the market it is then:
* bridged to Berachain mainnet
* 1&#x2F;3 of it used in the Beraborrow&#x27;s PSM Bond to mint  NECT
* 1&#x2F;3 of it used to mint HONEY
* deposit all funds into BurrBear&#x27;s NECT &#x2F; USDC &#x2F; HONEY pool`,
  is_verified: false,
  category: `boyco`,
});
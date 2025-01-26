import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xa655556eb64a0fd18b9a3c80794ab370743bc431a4b2a6116fa97dcc7f741a2b`,
  name: `Origami USDC Boyco Vault`,
  description: `USDC tokens supplied to this Berachain predeposit market earn bKAMI valued at $69M FDV pro-rata accordingly to TVL (40% APR). bKAMI are non-transferable points that will be redeemable 1:1 for KAMI (OrigamiDAO governance token) at TGE. Up to 10% of the KAMI token supply is allocated for a maximum of $69M TVL in this market. OrigamiDAO will utilise the USDC in a major stable LP e.g. HONEY, USDC, BYUSD to farm BGT and iBGT PoL rewards. Boyco USDC deposits will be locked for 3 months and will be fully redeemable for the original USDC deposit amount at the end of the 3 months, directly on Berachain. Any potential fees or slippage during the stablecoin LP unwinding process will be 100% covered by OrigamiDAO. More information can be found at: https:&#x2F;&#x2F;docs.origami.finance&#x2F;boyco`,
  is_verified: false,
  category: `boyco`,
});

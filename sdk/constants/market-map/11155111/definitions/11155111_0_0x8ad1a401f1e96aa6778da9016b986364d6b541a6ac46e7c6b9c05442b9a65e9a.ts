import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `11155111_0_0x8ad1a401f1e96aa6778da9016b986364d6b541a6ac46e7c6b9c05442b9a65e9a`,
  name: `BOYCO - Predeposit in Origami bKAMI`,
  description: `USDC supplied to this market earns bKAMI at a $69M FDV pro-rata according to TVL (40% APR). bKAMI are non-transferable points that can be redeemed 1:1 for KAMI (OrigamiDAO governance token) at TGE. 

10% of the KAMI supply is allocated for max $69M TVL. 

User deposits in Boyco are locked for 3 months and then fully redeemable back to 100% of the deposit amount. 

OrigamiDAO will utilise the USDC in a USDC&#x2F;HONEY or equivalent stablecoin LP to farm BGT and iBGT rewards.`,
  is_verified: false,
});

import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `11155111_0_0x5a1271f538303a5c1139b506712e680fd660d5b56ff5bbe98080ed537bdafdda`,
  name: `Sepolia Recipe Market`,
  description: `USDC (HONEY) supplied to this market earns bKAMI at a $69M FDV pro-rata according to TVL (40% APR). 10% of the supply is allocated for max $69M TVL. User deposits are locked for 3 months. 

bKAMI are non-transferable points that can be redeemed 1:1 for KAMI at TGE.`,
  is_verified: false,
});

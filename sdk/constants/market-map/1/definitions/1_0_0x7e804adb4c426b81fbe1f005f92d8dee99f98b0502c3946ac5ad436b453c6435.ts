import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x7e804adb4c426b81fbe1f005f92d8dee99f98b0502c3946ac5ad436b453c6435`,
  name: `Lend USDC on Dahlia (sUSDe&#x2F;USDC)`,
  description: `Earn PETALS (Dahlia Points) and BERA incentives for lending USDC on Dahlia sUSDe&#x2F;USDC (91% LLTV) lending market on Berachain.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0xbd1e5b7fa18f2679070c8ba9ab6415ef786720cc"],
  external_incentives: [
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena Sats",

      value: async ({ roycoClient, chainClient }) => {
        const value = "5x";
        return value;
      },
    },
  ],
});

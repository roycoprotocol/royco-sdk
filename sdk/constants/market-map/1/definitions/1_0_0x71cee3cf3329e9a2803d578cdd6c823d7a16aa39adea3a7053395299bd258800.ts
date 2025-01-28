import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x71cee3cf3329e9a2803d578cdd6c823d7a16aa39adea3a7053395299bd258800`,
  name: `BurrBear USDC Stable Pool`,
  description: `When USDC is deposited into the market: 1. It is bridged to Berachain mainnet 2. The funds are split: - 1&#x2F;3 is used in Beraborrow&#x27;s PSM Bond to mint NECT - 1&#x2F;3 is used to mint HONEY - 1&#x2F;3 remains as USDC 3. All funds are then deposited into BurrBear&#x27;s NECT&#x2F;USDC&#x2F;HONEY liquidity pool.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0xac672544ff301415547ac98558ca2988a26b9cbd"],
  external_incentives: [
    {
      token_id: "1-0xfbca1de031ac44e83850634c098f22137e4647e5",
      label: "Beraborrow bPOLLEN",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
  ],
});

import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xdd3f0e11d59726f2e63fc1b180abc94034dd3e0f4018b51371b73348d82b3769`,
  name: `Restake uniBTC on SatLayer`,
  description: `Deposit uniBTC into SatLayer, which is restaked to bring Bitcoin shared security to applications and infrastructure on Berachain and leading ecosystems.`,
  is_verified: true,
  category: `boyco`,
  incentive_ids: ["1-0x9c80538ffcbaee0db71caabe87ee99785ffc4f55"],
  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000bbb",
      label: "Babylon Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0xcde5d40f312b9bcf704babcdb6713d2547a277c4",
      label: "Bedrock Diamonds",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4M";
        return value;
      },
    },
  ],
});

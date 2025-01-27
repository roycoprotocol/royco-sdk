import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x2240151f263be555a4ef61476a5c111373e0efe8cd539f179b4b5850977e9d4e`,
  name: `Provide USDe-NECT Liquidity on Kodiak`,
  description: `Deposit USDe on Ethereum Mainnet and bridge USDe to Berachain. On Berachain, mint NECT with ~50% of the USDe, then provide liquidity in the USDe-NECT Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
  external_incentives: [
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "BODIAK Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "1x";
        return value;
      },
    },
    {
      token_id: "1-0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
      label: "Ethena Sats",

      value: async ({ roycoClient, chainClient }) => {
        const value = "20x";
        return value;
      },
    },
  ],
});

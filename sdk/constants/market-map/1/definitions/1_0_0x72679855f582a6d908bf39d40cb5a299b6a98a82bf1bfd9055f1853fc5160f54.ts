import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x72679855f582a6d908bf39d40cb5a299b6a98a82bf1bfd9055f1853fc5160f54`,
  name: `Supply uniBTC into Goldilocks`,
  description: `Goldilocks&#x27; yield splitting vaults enable users to trade the future earnings of yield bearing positions. Users can deposit assets into a yield splitting vault, and the vault will automatically use the assets to create yield bearing positions on supported platforms. Their Boyco markets will yield-split half of deposited assets, and LP the remainder against the OT (Ownership Token).

Deposit uniBTC on Ethereum Mainnet and bridge the asset to Berachain. On Berachain, mint uniBTC-OT and uniBTC-YT with a portion of the uniBTC via Goldilocks, then pair the minted uniBTC-OT and remaining uniBTC to provide liquidity in the uniBTC&lt;&gt;uniBTC-OT Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position.`,
  is_verified: false,
  category: `boyco`,
  external_incentives: [
    {
      token_id: "1-0xcde5d40f312b9bcf704babcdb6713d2547a277c4",
      label: "Bedrock Diamonds (pro rata)",

      value: async ({ roycoClient, chainClient }) => {
        const value = "22.5M";
        return value;
      },
    },
  ],
});

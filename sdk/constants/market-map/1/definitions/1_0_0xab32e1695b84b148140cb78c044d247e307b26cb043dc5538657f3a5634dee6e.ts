import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xab32e1695b84b148140cb78c044d247e307b26cb043dc5538657f3a5634dee6e`,
  name: `Supply rsETH into Goldilocks`,
  description: `Goldilocks&#x27; yield splitting vaults enable users to trade the future earnings of yield bearing positions. Users can deposit assets into a yield splitting vault, and the vault will automatically use the assets to create yield bearing positions on supported platforms. Their Boyco markets will yield-split half of deposited assets, and LP the remainder against the OT (Ownership Token). Deposit rsETH on Ethereum Mainnet and bridge the asset to Berachain. On Berachain, mint rsETH-OT and rsETH-YT with a portion of the rsETH via Goldilocks, then pair the minted rsETH-OT and remaining rsETH to provide liquidity in the rsETH&lt;&gt;rsETH-OT Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position.`,
  is_verified: false,
  category: `boyco`,
  incentive_ids: ["1-0x3b7795688ea8c095600bae9d6d866d04c230ba16"],
  external_incentives: [
    {
      token_id: "1-0xa1290d69c65a6fe4df752f95823fae25cb99e5a7",
      label: "Kelp Miles",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
  ],
});

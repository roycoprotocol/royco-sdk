import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xbd3ef685577bdca03225bb2cd2158f0772cdfd694ba03b9eb4856b59a7288081`,
  name: `Supply solvBTC.bbn into Goldilocks`,
  description: `Goldilocks&#x27; yield splitting vaults enable users to trade the future earnings of yield bearing positions. Users can deposit assets into a yield splitting vault, and the vault will automatically use the assets to create yield bearing positions on supported platforms. Their Boyco markets will yield-split half of deposited assets, and LP the remainder against the OT (Ownership Token). Deposit solvBTC.bbn on Ethereum Mainnet and bridge the asset to Berachain. On Berachain, mint solvBTC.bbn-OT and solvBTC.bbn-YT with a portion of the solvBTC.bbn via Goldilocks, then pair the minted solvBTC.bbn-OT and remaining solvBTC.bbn to provide liquidity in the solvBTC.bbn&lt;&gt;solvBTC.bbn-OT Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position.`,
  is_verified: false,
  category: `boyco`,
  incentive_ids: ["1-0x3b7795688ea8c095600bae9d6d866d04c230ba16"],
  external_incentives: [
    {
      token_id: "1-0xd9d920aa40f578ab794426f5c90f6c731d159def",
      label: "Solv S2 Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
  ],
});

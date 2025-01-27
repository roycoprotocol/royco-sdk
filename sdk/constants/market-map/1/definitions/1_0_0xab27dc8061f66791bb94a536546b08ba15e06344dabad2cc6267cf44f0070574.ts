import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xab27dc8061f66791bb94a536546b08ba15e06344dabad2cc6267cf44f0070574`,
  name: `Provide pumpBTC.bera-FBTC Liquidity on Kodiak`,
  description: `Deposit pumpBTC.bera-FBTC Uniswap V2 LP token(s) on Ethereum Mainnet and bridge these assets to Berachain. On Berachain, provide liquidity in the pumpBTC.bera-FBTC Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. 

Earn DEX LP fees, as well as rewards from Berachain, Ignition, PumpBTC, and Kodiak. This is part of the Berachain'&#x27;'s Boyco pre-deposit campaign. 

3% of the Kodiak token supply is allocated to Boyco, proportional to TVL * multiplier. This specific market has a ~1x multiplier for Bodiak points. More info on Kodiak's Boyco rewards: https://docs.kodiak.finance/kodiak-boyco`,
  is_verified: false,
  category: `boyco`,

  external_incentives: [
    {
      token_id: "1-0xb000000000000000000000000000000000000112",
      label: "Ignition Sparks",

      value: async ({ roycoClient, chainClient }) => {
        const value = "2x";
        return value;
      },
    },
    {
      token_id: "1-0xadc9c900b05f39f48bb6f402a1bae60929f4f9a8",
      label: "PumpBTC Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
    {
      token_id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
      label: "DEX Fees",

      value: async ({ roycoClient, chainClient }) => {
        const value = "Variable Rate";
        return value;
      },
    },
  ],
});

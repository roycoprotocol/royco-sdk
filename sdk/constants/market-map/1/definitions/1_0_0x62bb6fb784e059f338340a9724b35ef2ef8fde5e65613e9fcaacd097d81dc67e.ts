import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x62bb6fb784e059f338340a9724b35ef2ef8fde5e65613e9fcaacd097d81dc67e`,
  name: `Provide NECT-HONEY Liquidity on Kodiak`,
  description: `Deposit USDC on Ethereum Mainnet and bridge USDC to Berachain. On Berachain, mint HONEY with ~50% of the USDC and mint NECT with ~50% of the USDC, then provide liquidity in the NECT-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. This is part of the Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xaf2a845c9d6007128b7aec375a4fcdee2b12bbaeb78caf928d3bd08e104417d6`,
  name: `Provide WETH-beraETH Liquidity on Kodiak, Stake LP with Infrared`,
  description: `Deposit WETH on Ethereum Mainnet and bridge WETH to Berachain. On Berachain, mint beraETH with ~50% of the WETH, then provide liquidity in the WETH-beraETH Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position. Finally, stake the Island receipt token in the respective Infrared iBGT-compatible Vault. This is part of Berachain&#x27;s Boyco pre-deposit campaign.`,
  is_verified: false,
  category: `boyco`,
});
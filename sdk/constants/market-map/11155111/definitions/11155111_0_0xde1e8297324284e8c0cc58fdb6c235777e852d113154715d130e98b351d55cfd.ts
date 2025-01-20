import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `11155111_0_0xde1e8297324284e8c0cc58fdb6c235777e852d113154715d130e98b351d55cfd`,
  name: `Kodiak Boyco USDT0-HONEY`,
  description: `Deposit USDT-USDC Uniswap V2 LP token(s) on Ethereum Mainnet, unwrap them to retrieve the underlying assets (USDT and USDC), and bridge these assets to Berachain via Stargate Hydra (USDT becomes USDT0). On Berachain, mint HONEY with all of the USDC via Honey Swap, then pair the USDT0 and HONEY in the appropriate ratio at the current price to provide liquidity in the USDT0-HONEY Kodiak Island, an automated liquidity management vault that tokenizes a &quot;concentrated&quot; range Uniswap V3 style liquidity position around 1.0. Finally, stake the Island receipt token in the respective Infrared Vault.`,
  is_verified: false,
});

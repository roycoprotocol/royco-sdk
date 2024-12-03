import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "1_0_0x021b96a61753074dcb33cc139e873058ecb3b9591fe9e8a7a59a58e9aa8cfebc",
  name: "Mint sUSD in YieldFi",
  description: "1. Deposit USDT to mint sUSD. sUSD earns 5x YieldCrumbs (points) earning ~85% APY at 1x ratio of FDV to TVL.

2. At the time of withdraw, you will receive an NFT representing your USDT balance which you can claim at https://yield.fi/mint#redeem after a 7 day cooldown period.",
  is_verified: false,
});
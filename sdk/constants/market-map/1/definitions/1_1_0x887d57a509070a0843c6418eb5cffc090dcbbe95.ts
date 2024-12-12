import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "1_1_0x887d57a509070a0843c6418eb5cffc090dcbbe95",
  name: "Supply USDC into ZeroLend",
  description: `When USDC is supplied into this vault, it gets supplied into the ZeroLend RWA market. USDC is then borrowed by yield traders who are looking to leverage their yield with RWA assets as collateral. This market charges a premium on interest rates allowing USDC suppliers to earn a higher interest rate than other lending protocol providers.`,
  is_verified: true,
});

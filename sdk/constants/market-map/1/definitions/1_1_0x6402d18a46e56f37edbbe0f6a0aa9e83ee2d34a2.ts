import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "1_1_0x6402d18a46e56f37edbbe0f6a0aa9e83ee2d34a2",
  name: "Lend WBTC on Gearbox",
  description: "When WBTC is supplied to the market, it is deposited into the Gearbox WBTC Mainnet Pool to earn yield. Users may withdraw at any time. As an additional incentive, depositors receive 2,000 Lombard LUX points per day for depositing.",
  is_verified: true,
});

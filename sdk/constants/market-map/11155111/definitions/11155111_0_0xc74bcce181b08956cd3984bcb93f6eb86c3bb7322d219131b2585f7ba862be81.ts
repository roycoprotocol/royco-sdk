import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "11155111_0_0xc74bcce181b08956cd3984bcb93f6eb86c3bb7322d219131b2585f7ba862be81",
  name: "Deposit USDC into Set & Forgetti (a THJ Joint)",
  description:
    "When USDC is supplied to the market, it is deposited into Set & Forgetti's HENLO/USDC LP Farm in Henlo Maxi mode. Users may withdraw after 3 months.",
  is_verified: false,
});

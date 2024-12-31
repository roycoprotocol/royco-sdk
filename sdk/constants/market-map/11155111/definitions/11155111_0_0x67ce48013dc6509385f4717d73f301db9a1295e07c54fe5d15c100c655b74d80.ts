import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "11155111_0_0x67ce48013dc6509385f4717d73f301db9a1295e07c54fe5d15c100c655b74d80",
  name: "BOYCO — Predeposit in The Honey Jar's Set & Forgetti USDC-Honey LP locker to farm Henlo",
  description:
    "When USDC is supplied to the market, it is deposited into Set & Forgetti's USDC-Honey LP locker. The LP is used to earn Berachain Proof of Liquidity rewards, which are harvested and autocompounded into Henlo tokens. Users may withdraw after 3 months.",
  is_verified: false,
});

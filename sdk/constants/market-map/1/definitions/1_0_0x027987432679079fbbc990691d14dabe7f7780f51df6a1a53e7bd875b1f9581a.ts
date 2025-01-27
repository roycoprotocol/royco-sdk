import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0x027987432679079fbbc990691d14dabe7f7780f51df6a1a53e7bd875b1f9581a`,
  name: `D2 Finance Kodiak++, Boyco`,
  description: `Kodiak++ is the Berachain evolution of our flagship ETH++ strategy, fine-tuned for BGT yield maximization. 

At its core, the strategy integrates looping mechanics through Dolomite and BERABorrow to dynamically optimize exposure and capital efficiency. Building on ETH++’s stellar 120% ROI track record in 2024, Kodiak++ adds a layer of advanced options-based risk management, ensuring superior returns while minimizing downside exposure. 

It’s the ultimate strategy for those seeking high-yield opportunities in the Berachain ecosystem.`,
  is_verified: true,
  category: `boyco`,

  incentive_ids: ["1-0x6a8b97bd31394075cb6dbd88dbb65808575b1a48"],
  
  external_incentives: [
    {
      token_id: "1-0xd9d920aa40f578ab794426f5c90f6c731d159def",
      label: "Solv S2 Points",

      value: async ({ roycoClient, chainClient }) => {
        const value = "4x";
        return value;
      },
    },
    {
      token_id: "1-0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb",
      label: "Ether.fi Rewards",

      value: async ({ roycoClient, chainClient }) => {
        const value = "3x";
        return value;
      },
    },
  ],
});

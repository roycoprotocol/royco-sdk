import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_1_0x7f24390ef4f8c1a372524ff1fa3a1d79d66d86ca`,
  name: `Deposit OS into Origin`,
  description: `Deposits Origin Sonic (OS) to earn passive yield. Learn more at https:&#x2F;&#x2F;www.originprotocol.com&#x2F;os`,
  is_verified: true,
  // category: "???",
  // incentive_ids: [],
  // external_incentives: [],
  external_incentives: [
    {
      token_id: "146-0xaa21e59bf97313b3b3850e9f878ffffc733a946a",
      label: "Sonic Points",
      value: async ({ roycoClient, chainClient }) => {
        return "12x Sonic Points";
      },
    },
  ],
});

import { roycoClient } from "@/sdk/client";
import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_1_0xa2bb5cd636a098783f629d1f1431934a45eee7fa.ts`,
  name: `Supply USDC into Euler Yield Market`,
  description: `Supply USDC in the USDC Vault in Euler Yield Market and get extra rEUL rewards and yield. Reward EUL converts to 1:1 with EUL over a period of 6 months. For more information, read here: https://forum.euler.finance/t/reward-eul-reul/1133.`,
  is_verified: true,
  native_yield: [
    {
      token_id: '1-0xf3e621395fc714b90da337aa9108771597b4e696',
      label: "Merkl Rewards",
      annual_change_ratio: async ({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;
        let vault_address = "0xe0a80d35bB6618CBA260120b279d357978c42BCE";
        try {
          const req = await fetch("https://api.merkl.xyz/v4/opportunities?name=Euler");
          const data = await req.json();
          
          interface MerklOpportunity {
            identifier?: string;
            apr: number;
          }
          
          const opportunity = data.find((opp: MerklOpportunity) => 
            opp.identifier?.toLowerCase() === vault_address.toLowerCase()
          );
          annual_change_ratio = opportunity?.apr || 0;
        } catch (err) {
          // Keep default 0 value on error
        }

        return annual_change_ratio / 100;
      }
    }
  ]
});

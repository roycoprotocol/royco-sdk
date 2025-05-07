import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `1_0_0xad0638b8e54fe13974731cbe9ecbeeb3bd67b0c66163d5995427ee3a7367880a`,
  name: `Deposit USDC into Neutrl LP Program for 6 months`,
  description: `Users deposit USDC in the Neutrl Royco Market for 6 months, and will be able to claim sNUSD and NTRL tokens from the Neutrl frontend. Users cannot withdraw once they deposit. $10mm of deposits into this market represent 0.21% of the NTRL token supply which will be distributed pro-rata to Royco depositors.`,
  is_verified: false,
});

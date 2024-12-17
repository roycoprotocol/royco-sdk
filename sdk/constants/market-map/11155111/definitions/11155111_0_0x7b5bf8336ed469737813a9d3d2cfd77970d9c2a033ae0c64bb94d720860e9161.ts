import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: "11155111_0_0x7b5bf8336ed469737813a9d3d2cfd77970d9c2a033ae0c64bb94d720860e9161",
  name: "Test Market - LP USDC/HONEY on Kodiak",
  description:
    "When USDC is supplied to this market, it is deposited into the CCDM Deposit Locker, bridged to CArtio, split 50/50 into USDC/HONEY on CArtio and then used to LP into the USDC/HONEY Kodiak pool.",
  is_verified: false,
});

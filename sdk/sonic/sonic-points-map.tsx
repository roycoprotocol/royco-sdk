import { SONIC_APP_TYPE } from "./sonic-market-map";

export const SONIC_TOKEN_ID = "146-0x0000000000000000000000000000000000000000";

export const SONIC_ROYCO_GEM_BOOST_ID =
  "146-0x3d10814c737b98de96f5010063ad4eb13d9c188e";

export const sonicPointsMap: {
  id: string;
  appType?: SONIC_APP_TYPE;
}[] = [
  {
    id: "146-0xd152f4c29fb0db011c8a5503aee3ce60c44f8985",
    appType: SONIC_APP_TYPE.SAPPHIRE,
  },
  {
    id: "146-0x5e75334f4270ffe07a80b28fc831bfab2d83706e",
    appType: SONIC_APP_TYPE.EMERALD,
  },
  {
    id: "146-0x3d10814c737b98de96f5010063ad4eb13d9c188e",
  },
];

export const TOTAL_SONIC_AIRDROP = 190_500_000;
export const TOTAL_SONIC_GEM_DISTRIBUTION = 1_680_000;

export enum SONIC_APP_TYPE {
  EMERALD = "emerald",
  SAPPHIRE = "sapphire",
  RUBY = "ruby",
}

export const SONIC_GEM_DISTRIBUTION_MAP = {
  [SONIC_APP_TYPE.EMERALD]: 13_125,
  [SONIC_APP_TYPE.SAPPHIRE]: 8_750,
  [SONIC_APP_TYPE.RUBY]: 4_375,
};

export const sonicMarketMap: {
  id: string;
  appType: SONIC_APP_TYPE;
  info?: {
    description: string;
    url: string;
  };
}[] = [
  {
    id: "146_1_0x4c6bac7f421fbdbb3232070517b948b8dcbdc67f",
    appType: SONIC_APP_TYPE.EMERALD,
    info: {
      description:
        "Avalon will distribute 13,125 Sonic Gems, pro-rata to all Avalon Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
  },
];

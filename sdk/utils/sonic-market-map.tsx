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
  {
    id: "146_0_0x74634bc836c8c44e39b87ae656db006d36a6d4e3d618eabb2fabf668960168cf",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
  },
  {
    id: "146_0_0x2f9dabe1388e41ce534c649dfa6bb7fc4293219b422ec3a654663d0f2f181604",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
  },
  {
    id: "146_0_0x2e8fb605f1e044b8a6bc9f0db673b92b6815b5333508e62b85de7e2ff44199a8",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
  },
  {
    id: "146_0_0x38e23d90004295763e6ca3c02aa15de17dd7c2b3cbb16e6ce1e52f3b68dea552",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
  },
];

export const TOTAL_SONIC_AIRDROP = 190_500_000;
export const TOTAL_SONIC_GEM_DISTRIBUTION = 1_680_000;

export const SONIC_ROYCO_GEM_DISTRIBUTION_MULTIPLIER = 0.751;

export const SONIC_CHAIN_ID = 146;

export enum SONIC_APP_TYPE {
  EMERALD = "emerald",
  SAPPHIRE = "sapphire",
  RUBY = "ruby",
}

export enum SONIC_APP {
  STABLE_JACK = "StableJack",
  RINGS = "Rings",
  SILIO = "Silo",
  ORIGIN = "Origin",
  SWAPX = "SwapX",
  SHADOW = "Shadow",
  AVALON = "Avalon",
  EULER = "Euler",
  AAVE = "Aave",
  BEETS = "Beets",
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
    url?: string;
  };
  app: SONIC_APP;
}[] = [
  {
    id: "146_0_0xb595ee1ce1ed0cb227c4dff793621845baf4d907bc60264349d5e975188ba5c2",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
    app: SONIC_APP.STABLE_JACK,
  },
  {
    id: "146_0_0x30f002e2f62bc4155d273b9745b5b40863b7ce80ec9f861ba08ca3e33f9e549c",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
    app: SONIC_APP.STABLE_JACK,
  },
  {
    id: "146_0_0x4c3c6946186992f776e9ddff186e0cedcbadbfb95fbe3d31f6f2b0f2d287253a",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
    app: SONIC_APP.STABLE_JACK,
  },
  {
    id: "146_0_0x0d7700e96d3bea53eb4d4271d02ff798e505b808afd646ea677ba1bb3843d8f5",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
    app: SONIC_APP.STABLE_JACK,
  },
  {
    id: "146_0_0x4db7f85fc602e994e4043b98abecfeda8acab06bcc186ab266a07a508c8fc92f",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
    app: SONIC_APP.STABLE_JACK,
  },
  {
    id: "146_0_0xb5f162c88950f16ff2870e8d035ad6f808eb88b0fe367edf3a76a209776f9852",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "StableJack will distribute 8,750 Sonic Gems, pro-rata to all StableJack Points holders on Royco. Depositors will redeem Gems for $S after Sonic Season 1.",
      url: "https://blog.soniclabs.com/sonic-points-simplified-how-to-qualify-for-200-million-s-airdrop/",
    },
    app: SONIC_APP.STABLE_JACK,
  },
  {
    id: "146_0_0x7d1f2a66eabf9142dd30d1355efcbfd4cfbefd2872d24ca9855641434816a525",
    appType: SONIC_APP_TYPE.EMERALD,
    info: {
      description:
        "Rings will distribute a pro-rata share of 13,125 Gems between depositors on Royco and rings.money. Each $1 of liquidity into Rings receive 48 Rings Points.",
    },
    app: SONIC_APP.RINGS,
  },
];

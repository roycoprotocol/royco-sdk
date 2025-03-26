export const TOTAL_SONIC_AIRDROP = 190_500_000;
export const TOTAL_SONIC_GEM_DISTRIBUTION = 1_680_000;

export const SONIC_ROYCO_GEM_DISTRIBUTION = 16_800;
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
  SILO = "Silo",
  ORIGIN = "Origin",
  SWAPX = "SwapX",
  SHADOW = "Shadow",
  AVALON = "Avalon",
  EULER = "Euler",
  AAVE = "Aave",
  BEETS = "Beets",
  PENDLE = "Pendle",
  STABILITY = "Stability",
}

export const SONIC_GEM_DISTRIBUTION_MAP = {
  [SONIC_APP_TYPE.EMERALD]: 13_125,
  [SONIC_APP_TYPE.SAPPHIRE]: 8_750,
  [SONIC_APP_TYPE.RUBY]: 4_375,
};

export const sonicMarketMap: {
  id: string;
  appType?: SONIC_APP_TYPE;
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
      url: "https://app.rings.money/#/points",
    },
    app: SONIC_APP.RINGS,
  },
  {
    id: "146_0_0x4e20121fb62791362565365080088dbfa17680ec368f5fc49e801dac00f73f30",
    app: SONIC_APP.PENDLE,
  },
  {
    id: "146_0_0x6288f069f1626e2c49d3b92ddaf1911bf4576fe670e0798648f1d25beb5cb383",
    app: SONIC_APP.PENDLE,
  },
  {
    id: "146_0_0x298704e61b0720d95aa73960722c07ab2387d4618b1a769124c157a1420699e1",
    app: SONIC_APP.PENDLE,
  },
  {
    id: "146_0_0x43089e4f71ca768555542d3229de5a06b9f3ed25f5ba829ba105c0dadc1ea22f",
    app: SONIC_APP.PENDLE,
  },
  {
    id: "146_0_0x1909c54081dda4ba39d7c18f53f1cdb34cb4f436557a5e82cb057d1355a0cd86",
    appType: SONIC_APP_TYPE.RUBY,
    info: {
      description:
        "Stability will distribute a pro-rata share of 4,375 Tokenized Gems between depositors on Royco and stability.farm UI. Stability Gems are tokenized.",
      url: "https://stability.farm/vaults",
    },
    app: SONIC_APP.STABILITY,
  },
  {
    id: "146_0_0xc2b6fade2c202f102b59c4f2a1dabcf414deec4bd0b868757e218ed19f3c8ca6",
    appType: SONIC_APP_TYPE.RUBY,
    info: {
      description:
        "Stability will distribute a pro-rata share of 4,375 Tokenized Gems between depositors on Royco and stability.farm UI. Stability Gems are tokenized.",
      url: "https://stability.farm/vaults",
    },
    app: SONIC_APP.STABILITY,
  },
  {
    id: "146_0_0xd355d633abacb9617e31c71fd21c68b224357850522defab3dfb8d6932d5cc11",
    appType: SONIC_APP_TYPE.SAPPHIRE,
    info: {
      description:
        "Beets will distribute a pro-rata share of 8,750 Sonic Gems between depositors on Royco and beets.fi. Beets Gems are Tokenized.",
      url: "https://beets.fi/stake",
    },
    app: SONIC_APP.BEETS,
  },
];

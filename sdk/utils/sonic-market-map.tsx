export enum SONIC_APP_TYPE {
  EMERALD = "emerald",
  SAPPHIRE = "sapphire",
  RUBY = "ruby",
}

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

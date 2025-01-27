import { getSupportedToken, SupportedToken } from "@/sdk/constants";
import { EnrichedMarketDataType } from "@/sdk/queries";

// Use market input token to get the market type and the asset type in order to get the multiplier
export const getMarketMultiplier = (
  market: EnrichedMarketDataType,
): MULTIPLIERS => {
  const inputToken = market?.input_token_data;
  const isOverridden = overrideMarketMap.find(
    (ovrItem) => ovrItem.marketid === market.market_id,
  );

  let assetType = getMarketAssetType(inputToken!);
  let marketType = getMarketType(market);
  if (isOverridden) {
    assetType = isOverridden.assetType;
    marketType = isOverridden.marketType;
  }

  let multiplier = 1;

  if (assetType === MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY) {
    if (marketType === MULTIPLIER_MARKET_TYPE.SINGLE_SIDED) {
      multiplier = MULTIPLIERS.SINGLE_TPO;
    } else if (marketType === MULTIPLIER_MARKET_TYPE.STABLESWAP) {
      multiplier = MULTIPLIERS.STABLE_TPO;
    }
  } else if (assetType === MULTIPLIER_ASSET_TYPE.HYBRID) {
    multiplier = MULTIPLIERS.STABLE_HYBRID;
  } else if (assetType === MULTIPLIER_ASSET_TYPE.MAJOR_ONLY) {
    if (marketType === MULTIPLIER_MARKET_TYPE.SINGLE_SIDED) {
      multiplier = MULTIPLIERS.SINGLE_MAJOR;
    } else if (marketType === MULTIPLIER_MARKET_TYPE.STABLESWAP) {
      multiplier = MULTIPLIERS.STABLE_MAJOR;
    } else if (marketType === MULTIPLIER_MARKET_TYPE.VOLATILE) {
      multiplier = MULTIPLIERS.VOLATILE_MAJOR;
    }
  }

  return multiplier;
};

// Calculate the asset type of the market based on the input token
export const getMarketAssetType = (
  inputToken: SupportedToken & {
    token0?: string;
    token1?: string;
  },
) => {
  if (isMajor(inputToken)) {
    return MULTIPLIER_ASSET_TYPE.MAJOR_ONLY;
  } else if (isThirdParty(inputToken)) {
    return MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY;
  }
  return MULTIPLIER_ASSET_TYPE.HYBRID;
};

// Calculate the market type base on the native asset of the market
// from that get the underlying dApp behind that market and then calculate the market type
export const getMarketType = (market: EnrichedMarketDataType) => {
  const marketAppId = market?.incentive_ids?.[0];

  // should never happen
  if (!marketAppId) {
    console.error("Market type not found");
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  }

  const marketApp = getMarketDapp(marketAppId);

  if (marketApp === MULTIPLIER_MARKET_DAPP.BERABORROW) {
    if (
      getMarketAssetType(market.input_token_data) ===
      MULTIPLIER_ASSET_TYPE.MAJOR_ONLY
    ) {
      return MULTIPLIER_MARKET_TYPE.VOLATILE;
    } else {
      return MULTIPLIER_MARKET_TYPE.STABLESWAP;
    }
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.DOLOMITE) {
    return MULTIPLIER_MARKET_TYPE.SINGLE_SIDED;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.KODIAK) {
    if (market.input_token_data.type === "lp") {
      const token0 = market.input_token_data.token0;
      const token1 = market.input_token_data.token1;
      const token0Data = getSupportedToken(token0);
      const token1Data = getSupportedToken(token1);
      const WBTC = getSupportedToken("WBTC");
      const WETH = getSupportedToken("WETH");
      const HONEY = getSupportedToken("HONEY");
      if (
        (WBTC.id === token0Data.id && HONEY.id === token1Data.id) ||
        (WETH.id === token0Data.id && HONEY.id === token1Data.id) ||
        (WBTC.id === token0Data.id && WETH.id === token1Data.id)
      ) {
        return MULTIPLIER_MARKET_TYPE.VOLATILE;
      } else {
        return MULTIPLIER_MARKET_TYPE.STABLESWAP;
      }
    }
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.BURR_BEAR) {
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.CONCRETE) {
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.VEDA_ETHER_FI) {
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.GOLDILocks) {
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.D2_FINANCE) {
    return MULTIPLIER_MARKET_TYPE.SINGLE_SIDED;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.DAHLIA) {
    return MULTIPLIER_MARKET_TYPE.SINGLE_SIDED;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.SAT_LAYER) {
    return MULTIPLIER_MARKET_TYPE.SINGLE_SIDED;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.ORIGAMI) {
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  } else if (marketApp === MULTIPLIER_MARKET_DAPP.THJ) {
    return MULTIPLIER_MARKET_TYPE.STABLESWAP;
    //   } else if (marketApp === MULTIPLIER_MARKET_DAPP.INFRARED) {
    //     return MULTIPLIER_MARKET_TYPE.STABLESWAP;
  }

  // should not reac here
  console.error("Market type not found");
  return MULTIPLIER_MARKET_TYPE.STABLESWAP;
};

// A market is considered major only if the input token is a major or
// if both of the underlying tokens of the LP are major
const isMajor = (
  inputToken: SupportedToken & {
    token0?: string;
    token1?: string;
  },
) => {
  function validate(
    inputToken: SupportedToken & {
      token0?: string;
      token1?: string;
    },
  ) {
    return !!MajorTokens.find((token) => token.id === inputToken.id);
  }

  if (inputToken.type !== "lp") {
    return validate(inputToken);
  } else {
    const token0 = inputToken.token0;
    const token1 = inputToken.token1;
    const token0Data = getSupportedToken(token0);
    const token1Data = getSupportedToken(token1);
    return validate(token0Data) && validate(token1Data);
  }
};

// A market is considered third party only if the input token is a third party or
// if both of the underlying tokens of the LP are third party
const isThirdParty = (
  inputToken: SupportedToken & {
    token0?: string;
    token1?: string;
  },
) => {
  function validate(
    inputToken: SupportedToken & {
      token0?: string;
      token1?: string;
    },
  ) {
    return !isMajor(inputToken);
  }

  if (inputToken.type !== "lp") {
    return validate(inputToken);
  } else {
    const token0 = inputToken.token0;
    const token1 = inputToken.token1;
    const token0Data = getSupportedToken(token0);
    const token1Data = getSupportedToken(token1);
    return validate(token0Data) && validate(token1Data);
  }
};

// Return the dApp of that market based on the native asset id
const getMarketDapp = (id: string) => {
  const dApp = dAppsPointsId.find((dapp) => dapp.id === id)?.dapp;
  if (!dApp) {
    console.error("market type error - dApp not resolved correctly");
  }
  return dApp;
};

// List of all the dApps that are supported in Boyco
export enum MULTIPLIER_MARKET_DAPP {
  BERABORROW = "Beraborrow",
  DOLOMITE = "Dolomite",
  KODIAK = "Kodiak",
  BURR_BEAR = "BurrBear",
  CONCRETE = "Concrete",
  VEDA_ETHER_FI = "Veda x Ether.Fi",
  GOLDILocks = "Goldilocks",
  D2_FINANCE = "D2 Finance",
  DAHLIA = "Dahlia",
  SAT_LAYER = "SatLayer",
  ORIGAMI = "Origami",
  THJ = "THJ",
  INFRARED = "Infrared",
}

// List of all the multipliers that are supported in Boyco
export enum MULTIPLIERS {
  SINGLE_TPO = 1,
  SINGLE_MAJOR = 1.5,
  STABLE_MAJOR = 1.35,
  STABLE_TPO = 1.369,
  STABLE_HYBRID = 2.69,
  VOLATILE_MAJOR = 4.2,
}

// List of all the asset types that are supported in Boyco
export enum MULTIPLIER_ASSET_TYPE {
  THIRD_PARTY_ONLY = "THIRD_PARTY_ONLY",
  MAJOR_ONLY = "MAJOR_ONLY",
  HYBRID = "HYBRID",
}

// List of all the market types that are supported in Boyco
export enum MULTIPLIER_MARKET_TYPE {
  SINGLE_SIDED = "SINGLE_SIDED",
  STABLESWAP = "STABLESWAP",
  VOLATILE = "VOLATILE",
}

// List of all the major tokens that are supported in Boyco
const MajorTokens = [
  { name: "USDC", id: "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
  { name: "USDT", id: "1-0xdac17f958d2ee523a2206206994597c13d831ec7" },
  //   { name: "HONEY", id: "1-" },
  { name: "WBTC", id: "1-0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" },
  { name: "WETH", id: "1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" },
];

const overrideMarketMap = [
  {
    marketid:
      "0xd77d3e3e075394a6c94a8c83dab114bb7266b96c5234e4a98476f41339029c30",
    dapp: MULTIPLIER_MARKET_DAPP.BERABORROW,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0xbe5cd829fcb3cdfe8224ad72fc3379198d38da26131c5b7ab6664c8f56a9730d",
    dapp: MULTIPLIER_MARKET_DAPP.DOLOMITE,
    marketType: MULTIPLIER_MARKET_TYPE.SINGLE_SIDED,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0x258ac521d801d5112a484ad1b82e6fd2efc24aba29e5cd3d56db83f4a173dc90",
    dapp: MULTIPLIER_MARKET_DAPP.DOLOMITE,
    marketType: MULTIPLIER_MARKET_TYPE.SINGLE_SIDED,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0x1997c604de34a71974228bca4a66f601427c48960b6e59ff7ebc8e34f43f3ecf",
    dapp: MULTIPLIER_MARKET_DAPP.KODIAK,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0xaf2a845c9d6007128b7aec375a4fcdee2b12bbaeb78caf928d3bd08e104417d6",
    dapp: MULTIPLIER_MARKET_DAPP.KODIAK,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.HYBRID,
  },
  {
    marketid:
      "0x219169d9e78064768cddd0397c2202dc9e5c2bc0e1dbc13465363b0458d33c34",
    dapp: MULTIPLIER_MARKET_DAPP.KODIAK,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0x25f7a422282a1f26d9d96b5d1c43fa5c6f8c355b0ed7a4755ac8d04a504817f5",
    dapp: MULTIPLIER_MARKET_DAPP.KODIAK,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0x3ef317447bd10825f0a053565f8474a460cfb22cda414ea30b671e304f0691b6",
    dapp: MULTIPLIER_MARKET_DAPP.KODIAK,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0x2240151f263be555a4ef61476a5c111373e0efe8cd539f179b4b5850977e9d4e",
    dapp: MULTIPLIER_MARKET_DAPP.BERABORROW,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.THIRD_PARTY_ONLY,
  },
  {
    marketid:
      "0x62bb6fb784e059f338340a9724b35ef2ef8fde5e65613e9fcaacd097d81dc67e",
    dapp: MULTIPLIER_MARKET_DAPP.BERABORROW,
    marketType: MULTIPLIER_MARKET_TYPE.STABLESWAP,
    assetType: MULTIPLIER_ASSET_TYPE.HYBRID,
  },
];

const dAppsPointsId = [
  {
    dapp: MULTIPLIER_MARKET_DAPP.KODIAK,
    id: "1-0x31dd27d7479b09f1c96aa94681845c0eb0026ef8",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.BERABORROW,
    id: "1-0xfbca1de031ac44e83850634c098f22137e4647e5",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.DOLOMITE,
    id: "1-0x460f8d9c78b1bde7da137ce75315bd15d34a369b",
  },
  //   {
  //     dapp: "Dolomite",
  //     id: "1-d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1d1",
  //   },
  {
    dapp: MULTIPLIER_MARKET_DAPP.BURR_BEAR,
    id: "1-0xac672544ff301415547ac98558ca2988a26b9cbd",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.CONCRETE,
    id: "1-0x5f979f9f7024b41c325a7a39c89cd65e5f6a5f6d",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.GOLDILocks,
    id: "1-0x3b7795688ea8c095600bae9d6d866d04c230ba16",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.D2_FINANCE,
    id: "1-0x6a8b97bd31394075cb6dbd88dbb65808575b1a48",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.DAHLIA,
    id: "1-0xbd1e5b7fa18f2679070c8ba9ab6415ef786720cc",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.SAT_LAYER,
    id: "1-0x9c80538ffcbaee0db71caabe87ee99785ffc4f55",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.ORIGAMI,
    id: "1-0xcffe9112bfa141ae9170be4d172d40a455662564",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.THJ,
    id: "1-0x325e05f22af5a3f7e2cb9b112e8f4d9b6c14b8b4",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.INFRARED,
    id: "1-0x3b2635c5d5cc5cee62b9084636f808c67da9988f",
  },
  {
    dapp: MULTIPLIER_MARKET_DAPP.VEDA_ETHER_FI,
    id: "1-0x3badc21d6bff9248ae4c3923093e04d505a52fef",
  },
];

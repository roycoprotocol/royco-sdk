import { BigNumber, ethers } from "ethers";
import {
  RawPositionTokenBalanceRecipe,
  PositionByMarket,
  Market,
  PositionByAccount,
  PositionByMarketByAccount,
} from "./types";
import BaseTokenQuotes from "./data/base-token-quotes.json";
import LpTokenQuotes from "./data/lp-token-quotes.json";

export const getTokenPrice = (tokenId: string) => {
  let tokenQuote = null;

  tokenQuote = BaseTokenQuotes.find((quote) => quote.token_id === tokenId);

  if (!tokenQuote) {
    tokenQuote = LpTokenQuotes.find((quote) => quote.token_id === tokenId);
  }

  const tokenPrice = parseFloat(tokenQuote?.price ?? "0");

  return tokenPrice;
};

export async function getPositionsByMarket({
  markets,
  positionTokenBalances,
}: {
  markets: Market[];
  positionTokenBalances: RawPositionTokenBalanceRecipe[];
}): Promise<Record<string, PositionByMarket>> {
  let recordMap: Record<string, PositionByMarket> = {};

  // Initialize recordMap with markets
  for (let i = 0; i < markets.length; i++) {
    const market = markets[i];

    if (!!market) {
      const marketId = market.id;

      if (!recordMap[marketId]) {
        recordMap[marketId] = {
          marketId,
          name: market.name,
          description: market.description,
          lockup_time: market.lockup_time,

          inputTokenId: market.input_token_id,
          inputTokenName: market.input_token_name,
          inputTokenSymbol: market.input_token_symbol,
          inputTokenDecimals: market.input_token_decimals,
          inputRawAmount: BigNumber.from(0).toString(),
          inputTokenAmount: ethers.utils.formatUnits(
            BigNumber.from(0),
            market.input_token_decimals,
          ),
          inputTokenAmountUSD: 0,

          incentiveId: market.incentive_token_id,
          incentiveTokenName: market.incentive_token_name,
          incentiveTokenSymbol: market.incentive_token_symbol,
          incentiveTokenDecimals: market.incentive_token_decimals,
          incentiveRawAmount: BigNumber.from(0).toString(),
          incentiveTokenAmount: ethers.utils.formatUnits(
            BigNumber.from(0),
            market.incentive_token_decimals,
          ),
        };
      }
    }
  }

  // Update recordMap from positionTokenBalances
  for (let i = 0; i < positionTokenBalances.length; i++) {
    const position = positionTokenBalances[i];

    if (!!position) {
      const marketId = position.rawMarketRefId.id;

      const entity = recordMap[marketId];

      if (!!entity) {
        if (position.tokenClass === "0") {
          // Update input raw amount
          entity.inputRawAmount = BigNumber.from(entity.inputRawAmount)
            .add(position.tokenAmount)
            .toString();

          // Update input token amount USD
          entity.inputTokenAmountUSD =
            getTokenPrice(entity.inputTokenId) *
            parseFloat(entity.inputTokenAmount);
        } else {
          // Update incentive raw amount
          entity.incentiveRawAmount = BigNumber.from(entity.incentiveRawAmount)

            .add(position.tokenAmount)
            .toString();
        }
      }
    }
  }

  // Convert raw amounts to token amounts
  Object.values(recordMap).forEach((entity) => {
    // Convert input raw amount to token amount
    entity.inputTokenAmount = ethers.utils.formatUnits(
      BigNumber.from(entity.inputRawAmount),
      entity.inputTokenDecimals,
    );

    // Update input token amount USD
    entity.inputTokenAmountUSD =
      getTokenPrice(entity.inputTokenId) * parseFloat(entity.inputTokenAmount);

    // Convert incentive raw amount to token amount
    entity.incentiveTokenAmount = ethers.utils.formatUnits(
      BigNumber.from(entity.incentiveRawAmount),
      entity.incentiveTokenDecimals,
    );
  });

  return recordMap;
}

export async function getPositionsByAccount({
  markets,
  positionTokenBalances,
}: {
  markets: Market[];
  positionTokenBalances: RawPositionTokenBalanceRecipe[];
}): Promise<Record<string, PositionByAccount>> {
  let marketMap: Record<string, Market> = {};
  let recordMap: Record<string, PositionByAccount> = {};

  // Initialize marketMap
  for (let i = 0; i < markets.length; i++) {
    const market = markets[i];

    if (!!market) {
      const marketId = market.id;
      marketMap[marketId] = market;
    }
  }

  // Update recordMap from positionTokenBalances
  for (let i = 0; i < positionTokenBalances.length; i++) {
    const position = positionTokenBalances[i];

    if (!!position) {
      const marketId = position.rawMarketRefId.id;
      const market = marketMap[marketId];

      if (!!market) {
        const accountAddress = position.accountAddress;
        let entity = recordMap[accountAddress];

        if (!entity) {
          recordMap[accountAddress] = {
            accountAddress,

            inputTokenId: market.input_token_id,
            inputTokenName: market.input_token_name,
            inputTokenSymbol: market.input_token_symbol,
            inputTokenDecimals: market.input_token_decimals,
            inputRawAmount: BigNumber.from(0).toString(),
            inputTokenAmount: ethers.utils.formatUnits(
              BigNumber.from(0),
              market.input_token_decimals,
            ),
            inputTokenAmountUSD: 0,

            incentiveId: market.incentive_token_id,
            incentiveTokenName: market.incentive_token_name,
            incentiveTokenSymbol: market.incentive_token_symbol,
            incentiveTokenDecimals: market.incentive_token_decimals,

            incentiveRawAmount: BigNumber.from(0).toString(),
            incentiveTokenAmount: ethers.utils.formatUnits(
              BigNumber.from(0),
              market.incentive_token_decimals,
            ),
          };
        }

        let newEntity = recordMap[accountAddress];

        if (!!newEntity) {
          if (position.tokenClass === "0") {
            // Update input raw amount
            newEntity.inputRawAmount = BigNumber.from(newEntity.inputRawAmount)
              .add(position.tokenAmount)
              .toString();
          } else {
            // Update incentive raw amount
            newEntity.incentiveRawAmount = BigNumber.from(
              newEntity.incentiveRawAmount,
            )
              .add(position.tokenAmount)
              .toString();
          }
        }
      }
    }
  }

  // Convert raw amounts to token amounts
  Object.values(recordMap).forEach((entity) => {
    // Convert input raw amount to token amount
    entity.inputTokenAmount = ethers.utils.formatUnits(
      BigNumber.from(entity.inputRawAmount),
      entity.inputTokenDecimals,
    );

    // Update input token amount USD
    entity.inputTokenAmountUSD =
      getTokenPrice(entity.inputTokenId) * parseFloat(entity.inputTokenAmount);

    // Convert incentive raw amount to token amount
    entity.incentiveTokenAmount = ethers.utils.formatUnits(
      BigNumber.from(entity.incentiveRawAmount),
      entity.incentiveTokenDecimals,
    );
  });

  return recordMap;
}

export async function getPositionsByMarketByAccount({
  markets,
  positionTokenBalances,
}: {
  markets: Market[];
  positionTokenBalances: RawPositionTokenBalanceRecipe[];
}): Promise<Record<string, PositionByMarketByAccount>> {
  let marketMap: Record<string, Market> = {};
  let recordMap: Record<string, PositionByMarketByAccount> = {};

  // Initialize marketMap
  for (let i = 0; i < markets.length; i++) {
    const market = markets[i];

    if (!!market) {
      const marketId = market.id;
      marketMap[marketId] = market;
    }
  }

  // Update recordMap from positionTokenBalances
  for (let i = 0; i < positionTokenBalances.length; i++) {
    const position = positionTokenBalances[i];

    if (!!position) {
      const marketId = position.rawMarketRefId.id;
      const market = marketMap[marketId];

      if (!!market) {
        const accountAddress = position.accountAddress;

        let recordId = `${marketId}_${accountAddress}`;

        let entity = recordMap[recordId];

        if (!entity) {
          recordMap[recordId] = {
            id: recordId,

            marketId,
            name: market.name,
            description: market.description,
            lockup_time: market.lockup_time,

            accountAddress,

            inputTokenId: market.input_token_id,
            inputTokenName: market.input_token_name,
            inputTokenSymbol: market.input_token_symbol,
            inputTokenDecimals: market.input_token_decimals,
            inputRawAmount: BigNumber.from(0).toString(),
            inputTokenAmount: ethers.utils.formatUnits(
              BigNumber.from(0),
              market.input_token_decimals,
            ),
            inputTokenAmountUSD: 0,

            incentiveId: market.incentive_token_id,
            incentiveTokenName: market.incentive_token_name,
            incentiveTokenSymbol: market.incentive_token_symbol,
            incentiveTokenDecimals: market.incentive_token_decimals,

            incentiveRawAmount: BigNumber.from(0).toString(),
            incentiveTokenAmount: ethers.utils.formatUnits(
              BigNumber.from(0),
              market.incentive_token_decimals,
            ),
          };
        }

        let newEntity = recordMap[recordId];

        if (!!newEntity) {
          if (position.tokenClass === "0") {
            // Update input raw amount
            newEntity.inputRawAmount = BigNumber.from(newEntity.inputRawAmount)
              .add(position.tokenAmount)
              .toString();
          } else {
            // Update incentive raw amount
            newEntity.incentiveRawAmount = BigNumber.from(
              newEntity.incentiveRawAmount,
            )
              .add(position.tokenAmount)
              .toString();
          }
        }
      }
    }
  }

  // Convert raw amounts to token amounts
  Object.values(recordMap).forEach((entity) => {
    // Convert input raw amount to token amount
    entity.inputTokenAmount = ethers.utils.formatUnits(
      BigNumber.from(entity.inputRawAmount),
      entity.inputTokenDecimals,
    );

    // Update input token amount USD
    entity.inputTokenAmountUSD =
      getTokenPrice(entity.inputTokenId) * parseFloat(entity.inputTokenAmount);

    // Convert incentive raw amount to token amount
    entity.incentiveTokenAmount = ethers.utils.formatUnits(
      BigNumber.from(entity.incentiveRawAmount),
      entity.incentiveTokenDecimals,
    );
  });

  return recordMap;
}

# Boyco Stats

## Usage

### Run the script

This script will do following things:

1. Fetch all the boyco positions from the subgraph
2. Transform the raw data into a more readable format
3. Write all the raw + transformed data inside [/data](./data) folder

```bash
pnpm run boyco:stats
```

### Generated Data

All the generated data is inside [/data](./data) folder and is organized in the following manner:

- [raw-positions.csv](./data/raw-positions.csv): Raw positions data in csv format
- [raw-positions.json](./data/raw-positions.json): Raw positions data in json format
- [positions-by-market.csv](./data/positions-by-market.csv): Positions data by market in csv format
- [positions-by-market.json](./data/positions-by-market.json): Positions data by market in json format
- [positions-by-account.csv](./data/positions-by-account.csv): Positions data by account in csv format
- [positions-by-account.json](./data/positions-by-account.json): Positions data by account in json format
- [positions-by-market-by-account.csv](./data/positions-by-market-by-account.csv): Positions data by market and account in csv format
- [positions-by-market-by-account.json](./data/positions-by-market-by-account.json): Positions data by market and account in json format

### Token Quotes

All the token quotes are inside [/data](./data) folder and is organized in the following manner:

- [base-token-quotes.json](./data/base-token-quotes.json): Base token quotes in json format
- [lp-token-quotes.json](./data/lp-token-quotes.json): LP token quotes in json format

The source of the token quotes are:

- [CoinMarketCap](https://coinmarketcap.com/)
- [Coingecko](https://coingecko.com/)

For LP tokens, the price is calculated using the script written in [lp-token-quotes.ts](./lp-token-quotes.ts) and the data is stored in [lp-token-quotes.json](./data/lp-token-quotes.json). For cross-reference, the raw lp token data is stored in [raw-lp-tokens-data.json](./data/raw-lp-tokens-data.json).

### Subgraph

The link for the subgraph is [here](https://api.goldsky.com/api/public/project_cm07c8u214nt801v1b45zb60i/subgraphs/royco-recipe-mainnet/2.0.15/gn) -- and can also be found in [constants.ts](./constants.ts)

The table that you need to query in order to get the raw positions data is `rawPositionTokenBalanceRecipes` and entity name is `RawPositionTokenBalanceRecipe`.

#### Raw Entity Definition

- id: id from Subgraph, `<CHAIN_ID>_<WEIROLL_WALLET_ADDRESS>_<TOKEN_CLASS>_<TOKEN_ID>`, Token class is 0 for input token and 1 for incentive token
- weirollWallet: Weiroll Wallet Address (address of the weiroll wallet that represents the position)
- accountAddress: Account Address (address of the account holding the position)
- tokenClass: Token Class (0 for input token and 1 for incentive token)
- tokenId: Token Id (`<CHAIN_ID>-<TOKEN_ADDRESS>`)
- tokenAmount: Token Amount (in wei)
- rawMarketRefId.id: global market id from Subgraph, `<CHAIN_ID>_<MARKET_TYPE>_<MARKET_HASH>`

## Definitions

All the type definitions are in [types.ts](./types.ts) file and their corresponding descriptions are commented in the same file.

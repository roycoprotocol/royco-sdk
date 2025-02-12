## Market Information

- Market ID: 21000000_1_0x91e59126365118a2bfe13560a3a575c6d42bf59f
- Market Link: https://app.royco.org/market/21000000/1/0x91e59126365118a2bfe13560a3a575c6d42bf59f
- Explorer Market Link: https://cornscan.io/address/0x91E59126365118A2BFE13560a3a575C6d42BF59f
- SDK Market Link: https://github.com/roycoprotocol/royco-sdk/blob/93d044bea9243a5cde84425feb4e0b0311a3d44c/sdk/constants/market-map/21000000/definitions/21000000_1_0x91e59126365118a2bfe13560a3a575c6d42bf59f.ts

## Incentive Information

- Token ID: 21000000-0x606cf606076d1a74cbea93940742b6a2cf901139
- Explorer Token Link: https://cornscan.io/address/0x606cF606076D1a74cBEA93940742B6a2cF901139/events
- SDK Token Link: https://github.com/roycoprotocol/royco-sdk/blob/93d044bea9243a5cde84425feb4e0b0311a3d44c/sdk/constants/token-map/21000000/definitions/21000000-0x606cf606076d1a74cbea93940742b6a2cf901139.ts

```tsx
import { defineToken } from "@/sdk/constants";

export default defineToken({
  id: "21000000-0x606cf606076d1a74cbea93940742b6a2cf901139",
  chain_id: 21000000,
  contract_address: "0x606cf606076d1a74cbea93940742b6a2cf901139",
  name: "Corn Kernels",
  symbol: "KERNELS",
  image:
    "https://imgproxy-mainnet.routescan.io/Ep-Teqz159w-GRQa32KyqR-2wDoSd6Bkr_OQYZYB8JE/pr:thumb_64/aHR0cHM6Ly9jbXMtY2RuLmF2YXNjYW4uY29tL2NtczIvY29ybl9sb2dvLmJlNzFmNWRjODJiYS5wbmc",
  decimals: 18,
  source: "external",
  search_id: "none",
  type: "point",
});
```

## Usage

### Run the script

This script will do following things:

1. Fetch all the positions from the subgraph
2. Transform the raw data into a more readable format
3. Write all the transformed data inside [/data](./data) folder with file name `kernel-market-positions.json`

### Run the script

```bash
pnpm run corn:kernel
```

### Generated Data

All the generated data is inside [/data](./data) folder and is organized in the following manner:

- [kernel-market-positions.json](./data/kernel-market-positions.json): Kernel market positions data in json format

### Data Definitions

- id: id from Subgraph, `<CHAIN_ID>_<MARKET_ID>_<ACCOUNT_ADDRESS>`
- rawMarketRefId.id: global market id from Subgraph, `<CHAIN_ID>_<MARKET_TYPE>_<MARKET_ID>`
- chainId: Chain Id
- accountAddress: Account Address (address of the account holding the position)
- marketId: Market Id (address of the wrapped vault)
- incentiveTokenId: Incentive Point Token Id (`<CHAIN_ID>-<TOKEN_ADDRESS>`)
- incentiveTokenRawAmount: Incentive Point Token Amount (in wei)
- incentiveTokenDecimalAmount: Incentive Point Token Amount (in token decimals)

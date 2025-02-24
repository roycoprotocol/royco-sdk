import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x38e23d90004295763e6ca3c02aa15de17dd7c2b3cbb16e6ce1e52f3b68dea552`,
  name: `Deposit wS to buy YT-wOS`,
  description: `YT-wOS enables investors to farm leveraged wOS yield while maintaining long $wOS exposure. 

In exchange, YT-wOS holders forgo their points exposure.`,
  is_verified: false,
    // Basically, YT is a yield bearing token, it is ERC4626, so ig it is a native yield?
  // @dev: We are depositing aTokens to YT-wOS and this way the price is increasing
  // @dev: These aTokens are just for internal accounting, so displaying them here might not make sense
  // @dev: Hence, using YT as the native yield directly
  native_yield: [
    {
      token_id: "146-0xe16bb6061b3567ee86285ab7780187cb39acc55e",
      label: 'YT-wOS',
      annual_change_ratio: async({ roycoClient, chainClient }) => {
        let annual_change_ratio = 0;
        
        const treasury = '0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59';
        const yt_address = '0xe16bb6061b3567ee86285ab7780187cb39acc55e';
        const pt_address = '0xbe1B1dd422d94f9c1784FB9356ef83A29E1A8cFa';
        const groupId = '0x61a61dfb0b4db8aac20724c4a07f5b0324dfcad0544a9bff19dc5ae50ae83b6b';
        
        let uApy = 11.6;

        try {
          // tvl * underlying APY / YT Market Cap * 0.8 + vt funding fee
          const tvl_supply = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: 'function',
                name: 'totalBaseToken',
                inputs: [{ name: 'groupId', type: 'bytes32' }],
                outputs: [{ name: '', type: 'uint256' }],
                stateMutability: 'view',
              },
            ],
            functionName: 'totalBaseToken',
            args: [groupId],
          });

          const tvl_price = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: 'function',
                name: 'currentBaseTokenPrice',
                inputs: [{ name: 'groupId', type: 'bytes32' }],
                outputs: [{ name: '', type: 'uint256' }],
                stateMutability: 'view',
              },
            ],
            functionName: 'currentBaseTokenPrice',
            args: [groupId],
          });

          const tvl = Number(tvl_supply ?? 0) * Number(tvl_price ?? 0) / 10 ** 36;

          const yt_supply = await chainClient.readContract({
            address: yt_address,
            abi: [
              {
                inputs: [],
                name: 'totalSupply',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256',},],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            functionName: 'totalSupply',
            args: [],
          });

          const yt_price = await chainClient.readContract({
            address: yt_address,
            abi: [
              {
                inputs: [],
                name: 'getNavPerShare',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256',},],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            functionName: 'getNavPerShare',
            args: [],
          }); 

          const yt_market_cap = Number(yt_supply ?? 0) * Number(yt_price ?? 0) / 10 ** 36;

          const pt_supply = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: 'totalSupply',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256',},],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            functionName: 'totalSupply',
            args: [],
          });

          const pt_price = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: 'getNavPerShare',
                outputs: [{ internalType: 'uint256', name: '', type: 'uint256',},],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            functionName: 'getNavPerShare',
            args: [],
          }); 

          const pt_market_cap = Number(pt_supply ?? 0) * Number(pt_price ?? 0) / 10 ** 36;

          const vt_funding_fee = 10 * pt_market_cap / yt_market_cap;

          const req = await fetch(
            "https://api.originprotocol.com/api/v2/OS/apr/trailing/100?chainId=146"
          );

          const data = await req.json();
          uApy = data.apy;

          const basic_yield = uApy * tvl / yt_market_cap * 0.8;

          annual_change_ratio = basic_yield + vt_funding_fee;
          annual_change_ratio /= 100;

        } catch (err) {

        }

        return annual_change_ratio;
      },
    },
  ],
});

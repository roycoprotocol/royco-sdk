import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x2f9dabe1388e41ce534c649dfa6bb7fc4293219b422ec3a654663d0f2f181604`,
  name: `Deposit wS to buy PT-stS`,
  description: `PT-stS enables investors to farm Sonic points, Gems, and Stable Jack Discount Tickets with leverage while maintaining long stS exposure.

In exchange, PT-stS holders pay a certain fee to YT-stS holders.`,
  is_verified: false,
  // @dev: Not sure what to add as token_id since discount tickets are not tokens, they are points
  external_incentives: [
    {
      token_id: "not_sure_what_to_add_here",
      label: 'Discount Tickets',
      value: async({ roycoClient, chainClient }) => {
        let value = "DT Multiplier";
        const treasury = '0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59';
        const pt_address = '0xFCA91fEEe65DB34448A83a74f4f8970b5dddfa7c';
        const groupId = '0x331e33bebec5fe0378b995e9ef7355a166e1dbd4902181d4e149dec9671a68ee';

        try {
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
          const result = 80 * (tvl / pt_market_cap);
          value = (result).toFixed() + "x Discount Tickets";
        } catch (error) {}
        return value;        
      },
    },
    {
      token_id: "not_sure_what_to_add_here",
      label: 'Sonic Points',
      value: async({ roycoClient, chainClient }) => {
        let value = "Sonic Points Multiplier";
        const treasury = '0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59';
        const pt_address = '0xFCA91fEEe65DB34448A83a74f4f8970b5dddfa7c';
        const groupId = '0x331e33bebec5fe0378b995e9ef7355a166e1dbd4902181d4e149dec9671a68ee';

        try {
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
          const result = 8 * (tvl / pt_market_cap);
          value = (result).toFixed() + "x Sonic Points";
        } catch (error) {}
        return value;        
      },
    },
  ],
});

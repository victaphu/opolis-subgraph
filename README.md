# Opolis work graph

- Matic: https://thegraph.com/explorer/subgraph/opolis/opolis-work-polygon
- Mumbai: https://thegraph.com/explorer/subgraph/opolis/opolis-work-mumbai

### Install

```bash
npm install
```

### Build

```bash
npm run prepare:{network}
```

Remember to remove any contracts that will not be deployed to a network from the subgraph.yaml before trying to deploy. 

Ex. If deploying on mainnet, remove the MerkleRedeem, Staking, Whitelisting contracts from subgraph.yaml, so only the OpolisPayv1 and OpolisPayv2 are in the file before moving on to the deployment step. 

### Deploy

Set `src/utils/ERC20/index.ts:23` to return the symbol of the native token for the target chain (i.e. ETH for mainnet, MATIC for Polygon, etc.). Set `src/utils/ERC20/index.ts:17` to the appropriate name.

```bash
npm run deploy:{network}
```

### Usage

All the entities with `IContract` interface has `address` of the contract as `id`.
All the entities with `IEvent` interface has `{transaction_hash}-{log_id}` as `id`.

Ethereum addresses should be passed lowercased:

- `0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8` ❌
- `0xb549b2442b2bd0a53795bc5cdcbfe0caf7aca9f8` ✅

The graph has covered all the events of the `CommonsWhitelist`, `CommonsEasyStaking` and `MerkleRedeem` contracts.
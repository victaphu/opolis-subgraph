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

### Deploy

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
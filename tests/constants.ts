import { Address, BigInt } from "@graphprotocol/graph-ts";

export const ownerAddress = Address.fromString("0x51e9210d7ee7a8e7064c8a71f0cb0baa2205f298");
export const accounts = [
  Address.fromString("0xc0ffee254729296a45a3885639ac7e10f9d54979"),
  Address.fromString("0x999999cf1046e68e36e1aa2e0e07105eddd1f08e"),
];

export namespace stakingContractMockData {
  export const description = "Test Mumbai";
  export const address = Address.fromString("0x4e0b295e8e24f841740ecc94cfbe3e75adcd6955");
  export const minStake = BigInt.fromI32(1);
  export const totalStaked = BigInt.fromI32(10);
  export const stakeToken = Address.fromString("0xe28d1611180320d0df6b35b83cc15cac7bb439e6");
};

export namespace workTokenMockData {
  export const decimals = 18;
  export const address = Address.fromString("0xe28d1611180320d0df6b35b83cc15cac7bb439e6");
  export const name = "MumbaiTestWork";
  export const symbol = "WORKvMT";
  export const totalSupply = BigInt.fromString("325000000000000000000000000");
};

import { ethereum } from "@graphprotocol/graph-ts";
import { createMockedFunction } from "matchstick-as";
import { merkleRedeemMockData, stakingContractMockData, workTokenMockData } from "../constants";
import { MockTokenData } from "../token";

export function mockToken(mockTokenData: MockTokenData): void {
  createMockedFunction(
    mockTokenData.address,
    "name",
    "name():(string)"
  ).returns([ethereum.Value.fromString(mockTokenData.name)]);
  createMockedFunction(
    mockTokenData.address,
    "symbol",
    "symbol():(string)"
  ).returns([ethereum.Value.fromString(mockTokenData.symbol)]);
  createMockedFunction(
    mockTokenData.address,
    "decimals",
    "decimals():(uint8)"
  ).returns([ethereum.Value.fromI32(mockTokenData.decimals)]);
  createMockedFunction(
    mockTokenData.address,
    "totalSupply",
    "totalSupply():(uint256)"
  ).returns([ethereum.Value.fromUnsignedBigInt(mockTokenData.totalSupply)]);
}

export function mockStakingContract(): void {
  createMockedFunction(
    stakingContractMockData.address,
    "stakeToken",
    "stakeToken():(address)"
  ).returns([ethereum.Value.fromAddress(stakingContractMockData.stakeToken)]);
  createMockedFunction(
    stakingContractMockData.address,
    "minStake",
    "minStake():(uint256)"
  ).returns([
    ethereum.Value.fromUnsignedBigInt(stakingContractMockData.minStake),
  ]);
  createMockedFunction(
    stakingContractMockData.address,
    "totalStaked",
    "totalStaked():(uint256)"
  ).returns([
    ethereum.Value.fromUnsignedBigInt(stakingContractMockData.totalStaked),
  ]);
  createMockedFunction(
    stakingContractMockData.address,
    "desc",
    "desc():(string)"
  ).returns([ethereum.Value.fromString(stakingContractMockData.description)]);
}

export function mockMerkleRedeemContract(): void {
  createMockedFunction(
    merkleRedeemMockData.address,
    "token",
    "token():(address)"
  ).returns([ethereum.Value.fromAddress(merkleRedeemMockData.rewardToken)]);
}

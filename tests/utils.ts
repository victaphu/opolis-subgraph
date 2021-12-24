import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
import { createMockedFunction, newMockEvent } from "matchstick-as";
import {
  OwnershipTransferred,
  Stake,
} from "../generated/CommonsEasyStaking/CommonsEasyStaking";
import { stakingContractMockData, workTokenMockData } from "./constants";

export function createMockOwnershipTransferred(
  previousOwnerAddress: Address,
  newOwnerAddress: Address
): OwnershipTransferred {
  let event: OwnershipTransferred = changetype<OwnershipTransferred>(
    newMockEvent()
  );
  event.address = stakingContractMockData.address;
  event.parameters = new Array();
  let previousOwner = new ethereum.EventParam(
    "previousOwner",
    ethereum.Value.fromAddress(previousOwnerAddress)
  );
  let newOwner = new ethereum.EventParam(
    "newOwner",
    ethereum.Value.fromAddress(newOwnerAddress)
  );

  event.parameters.push(previousOwner);
  event.parameters.push(newOwner);

  return event;
}

export function createMockStake(
  stakerAddress: Address,
  amountStaked: BigInt,
  totalStaked: BigInt
): Stake {
  let event: Stake = changetype<Stake>(newMockEvent());

  event.address = stakingContractMockData.address;
  event.parameters = new Array();
  let staker = new ethereum.EventParam(
    "staker",
    ethereum.Value.fromAddress(stakerAddress)
  );
  let amount = new ethereum.EventParam(
    "amountStaked",
    ethereum.Value.fromUnsignedBigInt(amountStaked)
  );
  let total = new ethereum.EventParam(
    "totalStaked",
    ethereum.Value.fromUnsignedBigInt(totalStaked)
  );
  
  event.parameters.push(staker);
  event.parameters.push(amount);
  event.parameters.push(total);

  return event;
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

export function mockWorkToken(): void {
  createMockedFunction(
    workTokenMockData.address,
    "name",
    "name():(string)"
  ).returns([ethereum.Value.fromString(workTokenMockData.name)]);
  createMockedFunction(
    workTokenMockData.address,
    "symbol",
    "symbol():(string)"
  ).returns([ethereum.Value.fromString(workTokenMockData.symbol)]);
  createMockedFunction(
    workTokenMockData.address,
    "decimals",
    "decimals():(uint8)"
  ).returns([ethereum.Value.fromI32(workTokenMockData.decimals)]);
  createMockedFunction(
    workTokenMockData.address,
    "totalSupply",
    "totalSupply():(uint256)"
  ).returns([ethereum.Value.fromUnsignedBigInt(workTokenMockData.totalSupply)]);
}

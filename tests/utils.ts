import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { createMockedFunction, newMockEvent } from "matchstick-as";
import { Stake } from "../generated/CommonsEasyStaking/CommonsEasyStaking";
import { AddedToWhitelist, OwnershipTransferred, RemovedFromWhitelist } from "../generated/CommonsWhitelist/CommonsWhitelist";
import { handleAddedToWhitelist, handleOwnershipTransferred } from "../src/mappings/CommonsWhitelist";
import {
  accounts,
  ownerAddress,
  stakingContractMockData,
  whitelistContractMockData,
  workTokenMockData,
} from "./constants";

export function createMockOwnershipTransferred<T extends ethereum.Event>(
  contractAddress: Address,
  previousOwnerAddress: Address,
  newOwnerAddress: Address
): T {
  let event: T = changetype<T>(newMockEvent());
  event.address = contractAddress;
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

export function createMockAddedToWhitelist(
  accountAddress: Address,
  isEmployee: boolean
): AddedToWhitelist {
  let event: AddedToWhitelist = changetype<AddedToWhitelist>(newMockEvent());
  event.address = whitelistContractMockData.address;
  event.parameters = new Array();
  let account = new ethereum.EventParam(
    "account",
    ethereum.Value.fromAddress(accountAddress)
  );
  let employee = new ethereum.EventParam(
    "employee",
    ethereum.Value.fromBoolean(isEmployee)
  );

  event.parameters.push(account);
  event.parameters.push(employee);

  return event;
}

export function createMockRemovedFromWhitelist(
  accountAddress: Address
): RemovedFromWhitelist {
  let event: RemovedFromWhitelist = changetype<RemovedFromWhitelist>(newMockEvent());
  event.address = whitelistContractMockData.address;
  event.parameters = new Array();
  let account = new ethereum.EventParam(
    "account",
    ethereum.Value.fromAddress(accountAddress)
  );

  event.parameters.push(account);

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


export function mockWhitelistUser(address: Address, isEmployee: boolean): void {
  let event = createMockAddedToWhitelist(address, isEmployee);
  handleAddedToWhitelist(event);
}

export function mockWhitelistContractEntity(): void {
  let event = createMockOwnershipTransferred<OwnershipTransferred>(
    whitelistContractMockData.address,
    accounts[0],
    ownerAddress
  );

  handleOwnershipTransferred(event);
}
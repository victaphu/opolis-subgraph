import { BigInt } from "@graphprotocol/graph-ts";
import { assert, test } from "matchstick-as";
import {
  CommonsEasyStaking,
  OwnershipTransferred,
} from "../generated/CommonsEasyStaking/CommonsEasyStaking";
import {
  handleOwnershipTransferred,
  handleStake,
  handleUnstake,
} from "../src/mappings/CommonsEasyStaking";
import { ERC20 } from "../src/utils/ERC20";
import { toBigDecimal } from "../src/utils/toBigDecimal";
import {
  accounts,
  stakingContractMockData,
  workTokenMockData,
} from "./constants";
import {
  createMockOwnershipTransferred,
  createMockStake,
  createMockUnstake,
  mockStakingContract,
  mockWhitelistContractEntity,
  mockWhitelistUser,
  mockWorkToken,
} from "./utils";

test("can mock WorkToken calls", () => {
  mockWorkToken();

  let workToken = new ERC20(workTokenMockData.address);
  assert.stringEquals(workTokenMockData.name, workToken.name);
  assert.stringEquals(workTokenMockData.symbol, workToken.symbol);
  assert.i32Equals(workTokenMockData.decimals, workToken.decimals);
  assert.bigIntEquals(workTokenMockData.totalSupply, workToken.totalSupply);
});

test("can mock StakingContract calls", () => {
  mockStakingContract();

  let contract = CommonsEasyStaking.bind(stakingContractMockData.address);
  let stakeTokenResult = contract.try_stakeToken();
  assert.booleanEquals(false, stakeTokenResult.reverted);
  assert.addressEquals(
    stakingContractMockData.stakeToken,
    stakeTokenResult.value
  );

  let descResult = contract.try_desc();
  assert.booleanEquals(false, descResult.reverted);
  assert.stringEquals(stakingContractMockData.description, descResult.value);

  let minStakeResult = contract.try_minStake();
  assert.booleanEquals(false, minStakeResult.reverted);
  assert.bigIntEquals(stakingContractMockData.minStake, minStakeResult.value);

  let totalStakeResult = contract.try_totalStaked();
  assert.booleanEquals(false, totalStakeResult.reverted);
  assert.bigIntEquals(
    stakingContractMockData.totalStaked,
    totalStakeResult.value
  );
});

test("can handle OwnershipTransferred event", () => {
  // Create mock events and functions
  let event = createMockOwnershipTransferred<OwnershipTransferred>(
    stakingContractMockData.address,
    accounts[0],
    accounts[1]
  );
  mockStakingContract();
  mockWorkToken();

  // call event handler
  handleOwnershipTransferred(event);

  // tests
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "id",
    event.address.toHex()
  );
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "owner",
    accounts[1].toHex()
  );
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "isPaused",
    "false"
  );
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "stakeToken",
    stakingContractMockData.stakeToken.toHex()
  );
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "minStake",
    toBigDecimal(
      stakingContractMockData.minStake,
      workTokenMockData.decimals
    ).toString()
  );
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "totalStake",
    toBigDecimal(
      stakingContractMockData.totalStaked,
      workTokenMockData.decimals
    ).toString()
  );
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "description",
    stakingContractMockData.description
  );
});

test("can handle Stake event", () => {
  const stakerAddress = accounts[0];
  const amountStaked = BigInt.fromString("1000000000000000000");
  const totalStaked = BigInt.fromString("1000000000000000000");
  let event = createMockStake(stakerAddress, amountStaked, totalStaked);
  mockWorkToken();
  mockWhitelistContractEntity();
  mockWhitelistUser(stakerAddress, true);

  handleStake(event);

  // User entiry tests
  assert.fieldEquals(
    "User",
    stakerAddress.toHex(),
    "totalStakedBalance",
    toBigDecimal(totalStaked, workTokenMockData.decimals).toString()
  );

  // StakingContract tests
  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "totalStake",
    toBigDecimal(totalStaked, workTokenMockData.decimals).toString()
  );

  // StakeEvent tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("StakeEvent", eventId, "id", eventId);
  assert.fieldEquals("StakeEvent", eventId, "user", stakerAddress.toHex());
  assert.fieldEquals("StakeEvent", eventId, "wallet", stakerAddress.toHex());
  assert.fieldEquals(
    "StakeEvent",
    eventId,
    "amount",
    toBigDecimal(amountStaked, workTokenMockData.decimals).toString()
  );
  assert.fieldEquals(
    "StakeEvent",
    eventId,
    "totalStaked",
    toBigDecimal(totalStaked, workTokenMockData.decimals).toString()
  );
  assert.fieldEquals(
    "StakeEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle unStake event", () => {
  const stakerAddress = accounts[0];
  const amountStaked = BigInt.fromString("500000000000000000");
  const totalStaked = BigInt.fromString("500000000000000000");
  let event = createMockUnstake(stakerAddress, amountStaked, totalStaked);
  mockWorkToken();

  handleUnstake(event);

  // User entiry tests
  assert.fieldEquals(
    "User",
    stakerAddress.toHex(),
    "totalStakedBalance",
    toBigDecimal(totalStaked, workTokenMockData.decimals).toString()
  );

  assert.fieldEquals(
    "StakingContract",
    event.address.toHex(),
    "totalStake",
    toBigDecimal(totalStaked, workTokenMockData.decimals).toString()
  );

  // UnstakeEvent tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("UnstakeEvent", eventId, "id", eventId);
  assert.fieldEquals("UnstakeEvent", eventId, "user", stakerAddress.toHex());
  assert.fieldEquals("UnstakeEvent", eventId, "wallet", stakerAddress.toHex());
  assert.fieldEquals(
    "UnstakeEvent",
    eventId,
    "amount",
    toBigDecimal(amountStaked, workTokenMockData.decimals).toString()
  );
  assert.fieldEquals(
    "UnstakeEvent",
    eventId,
    "totalStaked",
    toBigDecimal(totalStaked, workTokenMockData.decimals).toString()
  );
  assert.fieldEquals(
    "UnstakeEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

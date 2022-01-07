import { BigInt } from "@graphprotocol/graph-ts";
import { assert, test } from "matchstick-as";
import {
  MerkleRedeem,
  OwnershipTransferred,
  RootAdded
} from "../generated/MerkleRedeem/MerkleRedeem";
import {
  handleClaimed,
  handleOwnershipTransferred,
  handleRootAdded
} from "../src/mappings/MerkleRedeem";
import {
  accounts,
  merkleRedeemMockData,
  workTokenMockData
} from "./helpers/constants";
import {
  createClaimed,
  createMockOwnershipTransferred,
  createRootAdded,
  mockMerkleRedeemContract,
  mockToken
} from "./helpers/mockers";

test("can mock MerkleRedeem contract calls", () => {
  mockMerkleRedeemContract();

  let contract: MerkleRedeem = MerkleRedeem.bind(merkleRedeemMockData.address);
  let tokenAddressResult = contract.try_token();
  assert.booleanEquals(false, tokenAddressResult.reverted);
  assert.addressEquals(
    merkleRedeemMockData.rewardToken,
    tokenAddressResult.value
  );
});

test("can handle OwnershipTransferred event", () => {
  // Create mock events and functions
  let event = createMockOwnershipTransferred<OwnershipTransferred>(
    merkleRedeemMockData.address,
    accounts[0],
    accounts[1]
  );
  mockMerkleRedeemContract();
  mockToken(workTokenMockData);

  // call event handler
  handleOwnershipTransferred(event);

  // tests
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "id",
    event.address.toHex()
  );
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "owner",
    accounts[1].toHex()
  );
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "rewardToken",
    merkleRedeemMockData.rewardToken.toHex()
  );
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "totalRewardCycles",
    "0"
  );
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "totalTokenAllocation",
    "0"
  );
});

test("can handle RootAdded event", () => {
  let event: RootAdded = createRootAdded(
    accounts[0],
    BigInt.fromI32(1),
    BigInt.fromI32(10).pow(workTokenMockData.decimals)
  );

  handleRootAdded(event);

  // MerkleRedeemContract tests
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "id",
    event.address.toHex()
  );
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "totalTokenAllocation",
    "1"
  );

  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // RootAddedEvent tests
  assert.fieldEquals("RootAddedEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "RootAddedEvent",
    eventId,
    "depositor",
    accounts[0].toHex()
  );
  assert.fieldEquals("RootAddedEvent", eventId, "rewardEpoch", "1");
  assert.fieldEquals("RootAddedEvent", eventId, "totalAllocation", "1");
  assert.fieldEquals(
    "RootAddedEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle Claimed event", () => {
  // Create mock events and functions
  let event = createClaimed(
    accounts[0],
    BigInt.fromString("1"),
    BigInt.fromI32(10).pow(workTokenMockData.decimals)
  );

  // call event handler
  handleClaimed(event);

  // MerkleRedeemContract tests
  assert.fieldEquals(
    "MerkleRedeemContract",
    event.address.toHex(),
    "totalRewardCycles",
    "1"
  );

  // User entity tests
  assert.fieldEquals("User", accounts[0].toHex(), "totalRewardClaimed", "1");

  // ClaimedEvent tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("ClaimedEvent", eventId, "id", eventId);
  assert.fieldEquals("ClaimedEvent", eventId, "wallet", accounts[0].toHex());
  assert.fieldEquals("ClaimedEvent", eventId, "rewardEpoch", "1");
  assert.fieldEquals("ClaimedEvent", eventId, "claimedBalance", "1");
  assert.fieldEquals(
    "ClaimedEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

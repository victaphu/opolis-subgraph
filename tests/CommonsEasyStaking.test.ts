import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
import { clearStore, test, assert, newMockEvent, createMockedFunction } from "matchstick-as";
import { CommonsEasyStaking, OwnershipTransferred } from "../generated/CommonsEasyStaking/CommonsEasyStaking";
import { handleOwnershipTransferred } from "../src/mappings/CommonsEasyStaking";
import { ERC20 } from "../src/utils/ERC20";
import { accounts, stakingContractMockData, workTokenMockData } from "./constants";
import { createMockOwnershipTransferred, mockStakingContract, mockWorkToken } from "./utils";

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
  let stakeTokenResult = contract.try_stakeToken()
  assert.booleanEquals(false, stakeTokenResult.reverted);
  assert.addressEquals(stakingContractMockData.stakeToken, stakeTokenResult.value);

  let descResult = contract.try_desc();
  assert.booleanEquals(false, descResult.reverted);
  assert.stringEquals(stakingContractMockData.description, descResult.value);

  let minStakeResult = contract.try_minStake();
  assert.booleanEquals(false, minStakeResult.reverted);
  assert.bigIntEquals(stakingContractMockData.minStake, minStakeResult.value);

  let totalStakeResult = contract.try_totalStaked();
  assert.booleanEquals(false, totalStakeResult.reverted);
  assert.bigIntEquals(stakingContractMockData.totalStaked, totalStakeResult.value);
});


test("can handle first OwnershipTransferred event", () => {
  // Create mock events and functions
  let event: OwnershipTransferred = createMockOwnershipTransferred(
    accounts[0],
    accounts[1]
  );
  mockStakingContract();

  // call event handler
  handleOwnershipTransferred(event);

  // tests
  assert.fieldEquals("StakingContract", event.address.toHex(), "id", event.address.toHex());
});

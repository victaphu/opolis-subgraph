import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
import { Stake, unStake } from "../../../../generated/CommonsEasyStaking/CommonsEasyStaking";
import { stakingContractMockData } from "../../constants";

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

export function createMockUnstake(
  stakerAddress: Address,
  amountUnstaked: BigInt,
  totalStaked: BigInt
): unStake {
  let event: unStake = changetype<unStake>(newMockEvent());

  event.address = stakingContractMockData.address;
  event.parameters = new Array();
  let staker = new ethereum.EventParam(
    "staker",
    ethereum.Value.fromAddress(stakerAddress)
  );
  let amount = new ethereum.EventParam(
    "amountUnstaked",
    ethereum.Value.fromUnsignedBigInt(amountUnstaked)
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
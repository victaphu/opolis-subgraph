import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
import {
  OpsStakeWithdraw,
  Staked,
} from "../../../../generated/OpolisPayV2/OpolisPayV2";
import { opolisPayMockData, stakingContractMockData } from "../../constants";

export function createStakedV2(
  staker: Address,
  memberId: BigInt,
  token: Address,
  amount: BigInt,
  stakeNumber: BigInt
): Staked {
  let event: Staked = changetype<Staked>(newMockEvent());
  event.address = stakingContractMockData.address;
  event.parameters = new Array();

  let stakerParam = new ethereum.EventParam(
    "staker",
    ethereum.Value.fromAddress(staker)
  );
  let memberIdParam = new ethereum.EventParam(
    "memberId",
    ethereum.Value.fromUnsignedBigInt(memberId)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );
  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(token)
  );
  let stakeNumberParam = new ethereum.EventParam(
    "stakeNumber",
    ethereum.Value.fromUnsignedBigInt(stakeNumber)
  );

  // Note: Order of parameters is important
  event.parameters.push(stakerParam);
  event.parameters.push(tokenParam);
  event.parameters.push(amountParam);
  event.parameters.push(memberIdParam);
  event.parameters.push(stakeNumberParam)

  return event;
}

export function createOpsStakeWithdrawV2(
  token: Address,
  stakeId: BigInt,
  amount: BigInt,
  stakeNumber: BigInt
): OpsStakeWithdraw {
  let event: OpsStakeWithdraw = changetype<OpsStakeWithdraw>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(token)
  );
  let stakeIdParam = new ethereum.EventParam(
    "stakeId",
    ethereum.Value.fromUnsignedBigInt(stakeId)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(amount)
  );
  let stakeNumberParam = new ethereum.EventParam(
    "stakeNumber",
    ethereum.Value.fromUnsignedBigInt(stakeNumber)
  );

  event.parameters.push(tokenParam);
  event.parameters.push(stakeIdParam);
  event.parameters.push(stakeNumberParam)
  event.parameters.push(amountParam);

  return event;
}

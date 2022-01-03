import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
import { Claimed, RootAdded } from "../../../../generated/MerkleRedeem/MerkleRedeem";
import { merkleRedeemMockData } from "../../constants";

export function createRootAdded(
  depositor: Address,
  rewardEpoch: BigInt,
  totalAllocation: BigInt
): RootAdded {
  let event: RootAdded = changetype<RootAdded>(newMockEvent());
  event.address = merkleRedeemMockData.address;
  event.parameters = new Array();

  let depositorParam = new ethereum.EventParam(
    "depositor",
    ethereum.Value.fromAddress(depositor)
  );
  let rewardEpochParam = new ethereum.EventParam(
    "rewardEpoch",
    ethereum.Value.fromUnsignedBigInt(rewardEpoch)
  );
  let totalAllocationParam = new ethereum.EventParam(
    "totalAllocation",
    ethereum.Value.fromUnsignedBigInt(totalAllocation)
  );

  event.parameters.push(depositorParam);
  event.parameters.push(rewardEpochParam);
  event.parameters.push(totalAllocationParam);

  return event;
}

export function createClaimed(claimant: Address, rewardEpoch: BigInt, claimedBalance: BigInt): Claimed {
  let event: Claimed = changetype<Claimed>(newMockEvent());
  event.address = merkleRedeemMockData.address;
  event.parameters = new Array();

  let claimantParam = new ethereum.EventParam(
    "claimant",
    ethereum.Value.fromAddress(claimant)
  );
  let rewardEpochParam = new ethereum.EventParam(
    "rewardEpoch",
    ethereum.Value.fromUnsignedBigInt(rewardEpoch)
  );
  let claimedBalanceParam = new ethereum.EventParam(
    "claimedBalance",
    ethereum.Value.fromUnsignedBigInt(claimedBalance)
  );

  event.parameters.push(claimantParam);
  event.parameters.push(rewardEpochParam);
  event.parameters.push(claimedBalanceParam);

  return event;
}

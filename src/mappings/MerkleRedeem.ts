import {
  Claimed,
  OwnershipTransferred,
  RootAdded
} from "../../generated/MerkleRedeem/MerkleRedeem";
import { MerkleRedeemContract } from "../../generated/schema";
import {
  createMerkleRedeemContract,
  increaseTotalRewardCycles,
  increaseTotalTokenAllocationBy
} from "../entities/contracts/MerkleRedeemContract";
import { createClaimedEvent } from "../entities/events/MerkleRedeem/ClaimedEvent";
import { createRootAddedEvent } from "../entities/events/MerkleRedeem/RootAddedEvent";
import { increaseRewardClaimedBy } from "../entities/User";

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let dbContract = MerkleRedeemContract.load(event.address.toHex());
  if (dbContract) {
    dbContract.owner = event.params.newOwner;
    dbContract.save();
  } else {
    createMerkleRedeemContract(
      event.address,
      event.params.newOwner,
      event.block.timestamp
    );
  }
}

export function handleRootAdded(event: RootAdded): void {
  increaseTotalTokenAllocationBy(event.address, event.params.totalAllocation);
  createRootAddedEvent(event);
}

export function handleClaimed(event: Claimed): void {
  increaseTotalRewardCycles(event.address);
  increaseRewardClaimedBy(
    event.address,
    event.params.claimant,
    event.params.balance,
    event.block.timestamp
  );
  createClaimedEvent(event);
}

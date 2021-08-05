import { WhitelistContract } from "./../../generated/schema";
import {
  OwnershipTransferred,
  AddedToWhitelist,
  RemovedFromWhitelist,
  UpdatedWhitelistAddress
} from "./../../generated/CommonsWhitelist/CommonsWhitelist";
import {
  createWhitelistContract,
  decreaseWhitelistUserCount,
  increaseWhitelistUserCount
} from "../entities/WhitelistContract";
import {
  createUser,
  removeUserFromWhitelist,
  updatePreferredWallet
} from "../entities/User";
import { createAddedToWhitelistEvent } from "../entities/AddedToWhitelistEvent";
import { createRemovedFromWhitelistEvent } from "../entities/RemovedFromWhitelistEvent";
import { createUpdatedWhitelistAddressEvent } from "../entities/UpdatedWhitelistAddressEvent";

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let dbContract = WhitelistContract.load(event.address.toHex());
  if (dbContract) {
    dbContract.owner = event.params.newOwner;
    dbContract.save();
  } else {
    createWhitelistContract(
      event.address,
      event.params.newOwner,
      event.block.timestamp
    );
  }
}

export function handleAddedToWhitelist(event: AddedToWhitelist): void {
  createUser(
    event.params.account,
    event.params.employee,
    true,
    event.block.timestamp
  );
  increaseWhitelistUserCount(event.address, event.params.employee);
  createAddedToWhitelistEvent(event);
}

export function handleRemovedFromWhitelist(event: RemovedFromWhitelist): void {
  removeUserFromWhitelist(event.params.account);
  decreaseWhitelistUserCount(event.address);
  createRemovedFromWhitelistEvent(event);
}

export function handleUpdatedWhitelistAddress(
  event: UpdatedWhitelistAddress
): void {
  updatePreferredWallet(
    event.params.oldAddress,
    event.params.newMemberAddress,
    event.block.timestamp
  );
  createUpdatedWhitelistAddressEvent(event);
}

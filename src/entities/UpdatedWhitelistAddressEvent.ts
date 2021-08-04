import { UpdatedWhitelistAddress } from "../../generated/CommonsWhitelist/CommonsWhitelist";
import { UpdatedWhitelistAddressEvent } from "./../../generated/schema";
import { ensureWallet } from "./Wallet";

export function createUpdatedWhitelistAddressEvent(
  event: UpdatedWhitelistAddress
): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let dbOldWallet = ensureWallet(
    event.params.oldAddress,
    event.block.timestamp
  );
  let dbUpdatedWallet = ensureWallet(
    event.params.newMemberAddress,
    event.block.timestamp
  );

  let dbEvent = new UpdatedWhitelistAddressEvent(eventId);
  dbEvent.user = dbOldWallet.user;
  dbEvent.oldWallet = dbOldWallet.id;
  dbEvent.updatedWallet = dbUpdatedWallet.id;
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}

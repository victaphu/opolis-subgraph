import { UpdatedWhitelistAddress } from "../../../../generated/CommonsWhitelist/CommonsWhitelist";
import { UpdatedWhitelistAddressEvent, Wallet } from "../../../../generated/schema";
import { ensureWallet } from "../../Wallet";

export function createUpdatedWhitelistAddressEvent(
  event: UpdatedWhitelistAddress
): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  let dbOldWallet: Wallet = ensureWallet(
    event.params.oldAddress,
    event.block.timestamp
  );
  let dbUpdatedWallet: Wallet = ensureWallet(
    event.params.newMemberAddress,
    event.block.timestamp
  );

  let dbEvent: UpdatedWhitelistAddressEvent = new UpdatedWhitelistAddressEvent(
    eventId
  );
  dbEvent.user = dbOldWallet.user;
  dbEvent.oldWallet = dbOldWallet.id;
  dbEvent.updatedWallet = dbUpdatedWallet.id;
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}

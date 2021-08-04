import { AddedToWhitelist } from "../../generated/CommonsWhitelist/CommonsWhitelist";
import { AddedToWhitelistEvent } from "./../../generated/schema";

export function createAddedToWhitelistEvent(event: AddedToWhitelist): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent = new AddedToWhitelistEvent(eventId);
  dbEvent.isEmployee = event.params.employee;
  dbEvent.user = event.params.account.toHex();
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}

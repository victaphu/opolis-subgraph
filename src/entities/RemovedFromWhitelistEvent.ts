import { RemovedFromWhitelist } from "../../generated/CommonsWhitelist/CommonsWhitelist";
import { RemovedFromWhitelistEvent } from "./../../generated/schema";

export function createRemovedFromWhitelistEvent(event: RemovedFromWhitelist): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent = new RemovedFromWhitelistEvent(eventId);
  dbEvent.user = event.params.account.toHex();
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}

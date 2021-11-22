import { NewAdmin } from "../../generated/OpolisPay/OpolisPay";
import { NewAdminEvent } from "./../../generated/schema";

export function createNewAdminEvent(event: NewAdmin): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: NewAdminEvent = new NewAdminEvent(eventId);
  dbEvent.opolisAdmin = event.params.opolisAdmin;
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
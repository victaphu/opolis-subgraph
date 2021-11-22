import { NewHelper } from "../../generated/OpolisPay/OpolisPay";
import { NewHelperEvent } from "./../../generated/schema";

export function createNewHelperEvent(event: NewHelper): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: NewHelperEvent = new NewHelperEvent(eventId);
  dbEvent.newHelper = event.params.newHelper;
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
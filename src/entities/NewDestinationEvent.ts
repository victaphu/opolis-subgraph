import { NewDestination } from "../../generated/OpolisPay/OpolisPay";
import { NewDestinationEvent } from "./../../generated/schema";

export function createNewDestinationEvent(event: NewDestination): void {
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: NewDestinationEvent = new NewDestinationEvent(eventId);
  dbEvent.destination = event.params.destination;
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
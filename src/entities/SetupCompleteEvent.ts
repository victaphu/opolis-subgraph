import { Bytes } from "@graphprotocol/graph-ts";
import { SetupComplete } from "../../generated/OpolisPay/OpolisPay";
import {SetupCompleteEvent} from "../../generated/schema";

export function createSetupCompleteEvent(event: SetupComplete): void {
  let eventId: string =
  event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  let dbEvent: SetupCompleteEvent = new SetupCompleteEvent(eventId);
  dbEvent.admin = event.params.admin;
  dbEvent.destination = event.params.destination;
  dbEvent.helper = event.params.helper;
  dbEvent.supportedTokens = event.params.tokens as Bytes[];
  dbEvent.timestamp = event.block.timestamp;
  dbEvent.save();
}
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, log, test } from "matchstick-as";
import { handleSetupComplete, handleStaked } from "../src/mappings/OpolisPay";
import { toBigDecimal } from "../src/utils/toBigDecimal";
import { accounts, opolisPayMockData } from "./helpers/constants";
import {
  createSetupComplete,
  createStaked,
  mockToken,
} from "./helpers/mockers";

test("can handle SetupComplete event", () => {
  let event = createSetupComplete(
    accounts[0],
    accounts[1],
    accounts[0],
    opolisPayMockData.supportedTokens
  );
  opolisPayMockData.supportedTokens.forEach((token) => {
    mockToken(token);
  });

  // call event handler
  handleSetupComplete(event);

  // OpolisPayContract entity tests
  assert.fieldEquals(
    "OpolisPayContract",
    opolisPayMockData.address.toHex(),
    "id",
    opolisPayMockData.address.toHex()
  );
  assert.fieldEquals(
    "OpolisPayContract",
    opolisPayMockData.address.toHex(),
    "destination",
    event.params.destination.toHex()
  );
  assert.fieldEquals(
    "OpolisPayContract",
    opolisPayMockData.address.toHex(),
    "opolisAdmin",
    event.params.admin.toHex()
  );
  assert.fieldEquals(
    "OpolisPayContract",
    opolisPayMockData.address.toHex(),
    "opolisHelper",
    event.params.helper.toHex()
  );
  assert.fieldEquals(
    "OpolisPayContract",
    opolisPayMockData.address.toHex(),
    "createdAt",
    event.block.timestamp.toString()
  );

  // OpolisPayToken entity tests
  for (let i = 0; i < event.params.tokens.length; i++) {
    let opolisPayTokenId =
      event.address.toHex() + "-" + event.params.tokens[i].toHex();
    assert.fieldEquals(
      "OpolisPayToken",
      opolisPayTokenId,
      "id",
      opolisPayTokenId
    );
    assert.fieldEquals(
      "OpolisPayToken",
      opolisPayTokenId,
      "token",
      event.params.tokens[i].toHex()
    );
    assert.fieldEquals(
      "OpolisPayToken",
      opolisPayTokenId,
      "opolisPayContract",
      event.address.toHex()
    );

    // Token entity tests
    assert.fieldEquals(
      "Token",
      event.params.tokens[i].toHex(),
      "id",
      event.params.tokens[i].toHex()
    );
    assert.fieldEquals(
      "Token",
      event.params.tokens[i].toHex(),
      "name",
      opolisPayMockData.supportedTokens[i].name
    );
    assert.fieldEquals(
      "Token",
      event.params.tokens[i].toHex(),
      "symbol",
      opolisPayMockData.supportedTokens[i].symbol
    );
    assert.fieldEquals(
      "Token",
      event.params.tokens[i].toHex(),
      "decimals",
      opolisPayMockData.supportedTokens[i].decimals.toString()
    );
    assert.fieldEquals(
      "Token",
      event.params.tokens[i].toHex(),
      "totalSupply",
      opolisPayMockData.supportedTokens[i].totalSupply.toString()
    );
  }

  // SetupCompleteEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();
  assert.fieldEquals("SetupCompleteEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "SetupCompleteEvent",
    eventId,
    "admin",
    event.params.admin.toHex()
  );
  assert.fieldEquals(
    "SetupCompleteEvent",
    eventId,
    "destination",
    event.params.destination.toHex()
  );
  assert.fieldEquals(
    "SetupCompleteEvent",
    eventId,
    "helper",
    event.params.helper.toHex()
  );
  assert.fieldEquals(
    "SetupCompleteEvent",
    eventId,
    "supportedTokens",
    "[" +
      event.params.tokens
        .map<string>((token: Address) => token.toHex())
        .join(", ") +
      "]"
  );
  assert.fieldEquals(
    "SetupCompleteEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle Staked event", () => {
  let event = createStaked(
    accounts[0],
    BigInt.fromI32(1),
    BigInt.fromI32(10).pow(18),
    opolisPayMockData.supportedTokens[0].address
  );

  // call event handler
  handleStaked(event);

  // StakedEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("StakedEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "StakedEvent",
    eventId,
    "staker",
    event.params.staker.toHex()
  );
  assert.fieldEquals(
    "StakedEvent",
    eventId,
    "memberId",
    event.params.memberId.toString()
  );
  assert.fieldEquals(
    "StakedEvent",
    eventId,
    "amount",
    toBigDecimal(event.params.amount, opolisPayMockData.supportedTokens[0].decimals).toString()
  );
  assert.fieldEquals(
    "StakedEvent",
    eventId,
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "StakedEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

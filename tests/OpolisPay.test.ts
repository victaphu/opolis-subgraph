import { log } from "@graphprotocol/graph-ts";
import { assert, test } from "matchstick-as";
import { handleSetupComplete } from "../src/mappings/OpolisPay";
import { accounts, opolisPayMockData } from "./helpers/constants";
import { createSetupComplete, mockToken } from "./helpers/mockers";

test("can handle SetupComplete event", () => {
  let event = createSetupComplete(
    accounts[0],
    accounts[1],
    accounts[0],
    opolisPayMockData.supportedTokens
  );
  opolisPayMockData.supportedTokens.forEach(token => {mockToken(token)});

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
});

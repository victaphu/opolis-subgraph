import { Address, BigInt } from "@graphprotocol/graph-ts";
import { assert, test } from "matchstick-as";
import {
  handleNewAdmin,
  handleNewDestination,
  handleNewHelper,
  handleNewTokens,
  handleOpsPayrollWithdraw,
  handleOpsStakeWithdraw,
  handlePaid,
  handleSetupCompleteV1,
  handleStaked,
  handleSweep
} from "../src/mappings/OpolisPay";
import { toBigDecimal } from "../src/utils/toBigDecimal";
import {
  accounts,
  opolisPayMockData,
  workTokenMockData
} from "./helpers/constants";
import {
  createNewAdmin,
  createNewDestination,
  createNewHelper,
  createNewTokens,
  createOpsPayrollWithdraw,
  createOpsStakeWithdraw,
  createPaid,
  createSetupComplete,
  createStaked,
  createSweep,
  mockToken
} from "./helpers/mockers";

test("can handle SetupComplete event", () => {
  let event = createSetupComplete(
    accounts[0],
    accounts[1],
    accounts[0],
    opolisPayMockData.supportedTokens
  );
  opolisPayMockData.supportedTokens.forEach(token => {
    mockToken(token);
  });

  // call event handler
  handleSetupCompleteV1(event);

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
  assert.fieldEquals(
    "OpolisPayContract",
    opolisPayMockData.address.toHex(),
    "version",
    "1"
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
    opolisPayMockData.supportedTokens[0].address,
    BigInt.fromI32(10).pow(18)
  );

  // call event handler
  handleStaked(event);

  // Stake entity tests
  assert.fieldEquals(
    "Stake",
    event.params.memberId.toString() + "-1",
    "id",
    event.params.memberId.toString() + "-1"
  );
  assert.fieldEquals(
    "Stake",
    event.params.memberId.toString() + "-1",
    "staker",
    event.params.staker.toHex()
  );
  assert.fieldEquals(
    "Stake",
    event.params.memberId.toString() + "-1",
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "Stake",
    event.params.memberId.toString() + "-1",
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals(
    "Stake",
    event.params.memberId.toString() + "-1",
    "stakeNumber",
    BigInt.fromI32(1).toString()
  );
  assert.fieldEquals(
    "Stake",
    event.params.memberId.toString() + "-1",
    "createdAt",
    event.block.timestamp.toString()
  );
  assert.fieldEquals(
    "Stake",
    event.params.memberId.toString() + "-1",
    "contract",
    event.address.toHex()
  );

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
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
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

test("can handle Paid event", () => {
  let event = createPaid(
    accounts[0],
    BigInt.fromI32(1),
    opolisPayMockData.supportedTokens[0].address,
    BigInt.fromI32(10).pow(18)
  );

  // call event handler
  handlePaid(event);

  // Payroll entity tests
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "id",
    event.params.payrollId.toString()
  );
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "payor",
    event.params.payor.toHex()
  );
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "createdAt",
    event.block.timestamp.toString()
  );

  // PaidEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("PaidEvent", eventId, "id", eventId);
  assert.fieldEquals("PaidEvent", eventId, "payor", event.params.payor.toHex());
  assert.fieldEquals(
    "PaidEvent",
    eventId,
    "payrollId",
    event.params.payrollId.toString()
  );
  assert.fieldEquals(
    "PaidEvent",
    eventId,
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals("PaidEvent", eventId, "token", event.params.token.toHex());
  assert.fieldEquals(
    "PaidEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle OpsPayrollWithdraw event", () => {
  let event = createOpsPayrollWithdraw(
    opolisPayMockData.supportedTokens[0].address,
    BigInt.fromI32(1),
    BigInt.fromI32(10).pow(18)
  );

  // call event handler
  handleOpsPayrollWithdraw(event);

  // Payroll entity tests
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "id",
    event.params.payrollId.toString()
  );
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals(
    "Payroll",
    event.params.payrollId.toString(),
    "withdrawnAt",
    event.block.timestamp.toString()
  );

  // OpsPayrollWithdrawEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("OpsPayrollWithdrawEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "OpsPayrollWithdrawEvent",
    eventId,
    "payrollId",
    event.params.payrollId.toString()
  );
  assert.fieldEquals(
    "OpsPayrollWithdrawEvent",
    eventId,
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals(
    "OpsPayrollWithdrawEvent",
    eventId,
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "OpsPayrollWithdrawEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle OpsStakeWithdrawEvent", () => {
  let event = createOpsStakeWithdraw(
    opolisPayMockData.supportedTokens[0].address,
    BigInt.fromI32(1),
    BigInt.fromI32(10).pow(18)
  );

  // call event handler
  handleOpsStakeWithdraw(event);

  // Stake entity tests
  assert.fieldEquals(
    "Stake",
    event.params.stakeId.toString() + "-1",
    "id",
    event.params.stakeId.toString() + "-1"
  );
  assert.fieldEquals(
    "Stake",
    event.params.stakeId.toString() + "-1",
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "Stake",
    event.params.stakeId.toString() + "-1",
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals(
    "Stake",
    event.params.stakeId.toString() + "-1",
    "stakeNumber",
    BigInt.fromI32(1).toString()
  );
  assert.fieldEquals(
    "Stake",
    event.params.stakeId.toString() + "-1",
    "withdrawnAt",
    event.block.timestamp.toString()
  );

  // OpsStakeWithdrawEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("OpsStakeWithdrawEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "OpsStakeWithdrawEvent",
    eventId,
    "stakeId",
    event.params.stakeId.toString()
  );
  assert.fieldEquals(
    "OpsStakeWithdrawEvent",
    eventId,
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals(
    "OpsStakeWithdrawEvent",
    eventId,
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "OpsStakeWithdrawEvent",
    eventId,
    "stakeNumber",
    BigInt.fromI32(1).toString()
  );
  assert.fieldEquals(
    "OpsStakeWithdrawEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle Sweep event", () => {
  let event = createSweep(
    opolisPayMockData.supportedTokens[0].address,
    BigInt.fromI32(10).pow(18)
  );

  // call event handler
  handleSweep(event);

  // SweepEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("SweepEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "SweepEvent",
    eventId,
    "amount",
    toBigDecimal(
      event.params.amount,
      opolisPayMockData.supportedTokens[0].decimals
    ).toString()
  );
  assert.fieldEquals(
    "SweepEvent",
    eventId,
    "token",
    event.params.token.toHex()
  );
  assert.fieldEquals(
    "SweepEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle NewDestination event", () => {
  let event = createNewDestination(accounts[0], accounts[1]);

  // call event handler
  handleNewDestination(event);

  // OpolisPayContract entity tests
  assert.fieldEquals(
    "OpolisPayContract",
    event.address.toHex(),
    "destination",
    event.params.destination.toHex()
  );

  // NewDestinationEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("NewDestinationEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "NewDestinationEvent",
    eventId,
    "destination",
    event.params.destination.toHex()
  );
  assert.fieldEquals(
    "NewDestinationEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle NewAdmin event", () => {
  let event = createNewAdmin(accounts[0], accounts[1]);

  // call event handler
  handleNewAdmin(event);

  // OpolisPayContract entity tests
  assert.fieldEquals(
    "OpolisPayContract",
    event.address.toHex(),
    "opolisAdmin",
    event.params.opolisAdmin.toHex()
  );

  // NewAdminEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("NewAdminEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "NewAdminEvent",
    eventId,
    "oldAdmin",
    event.params.oldAdmin.toHex()
  );
  assert.fieldEquals(
    "NewAdminEvent",
    eventId,
    "opolisAdmin",
    event.params.opolisAdmin.toHex()
  );
  assert.fieldEquals(
    "NewAdminEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle NewHelper event", () => {
  let event = createNewHelper(accounts[0], accounts[1]);

  // call event handler
  handleNewHelper(event);

  // OpolisPayContract entity tests
  assert.fieldEquals(
    "OpolisPayContract",
    event.address.toHex(),
    "opolisHelper",
    event.params.newHelper.toHex()
  );

  // NewHelperEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("NewHelperEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "NewHelperEvent",
    eventId,
    "oldHelper",
    event.params.oldHelper.toHex()
  );
  assert.fieldEquals(
    "NewHelperEvent",
    eventId,
    "newHelper",
    event.params.newHelper.toHex()
  );
  assert.fieldEquals(
    "NewHelperEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

test("can handle NewTokens event", () => {
  const newSupportedTokens = [workTokenMockData];
  let event = createNewTokens(
    newSupportedTokens.map<Address>(token => token.address)
  );
  mockToken(workTokenMockData);

  // call event handler
  handleNewTokens(event);

  // OpolisPayToken entity tests
  for (let i = 0; i < event.params.newTokens.length; i++) {
    let opolisPayTokenId =
      event.address.toHex() + "-" + event.params.newTokens[i].toHex();
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
      event.params.newTokens[i].toHex()
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
      event.params.newTokens[i].toHex(),
      "id",
      event.params.newTokens[i].toHex()
    );
    assert.fieldEquals(
      "Token",
      event.params.newTokens[i].toHex(),
      "name",
      newSupportedTokens[i].name
    );
    assert.fieldEquals(
      "Token",
      event.params.newTokens[i].toHex(),
      "symbol",
      newSupportedTokens[i].symbol
    );
    assert.fieldEquals(
      "Token",
      event.params.newTokens[i].toHex(),
      "decimals",
      newSupportedTokens[i].decimals.toString()
    );
    assert.fieldEquals(
      "Token",
      event.params.newTokens[i].toHex(),
      "totalSupply",
      newSupportedTokens[i].totalSupply.toString()
    );
  }

  // NewTokensEvent entity tests
  let eventId: string =
    event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  assert.fieldEquals("NewTokensEvent", eventId, "id", eventId);
  assert.fieldEquals(
    "NewTokensEvent",
    eventId,
    "newTokens",
    "[" +
      event.params.newTokens
        .map<string>(token => token.toHex())
        .join(", ") +
      "]"
  );
  assert.fieldEquals(
    "NewTokensEvent",
    eventId,
    "timestamp",
    event.block.timestamp.toString()
  );
});

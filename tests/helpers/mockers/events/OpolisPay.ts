import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
import { SetupComplete, Staked } from "../../../../generated/OpolisPay/OpolisPay";
import { accounts, opolisPayMockData, stakingContractMockData } from "../../constants";
import { MockTokenData } from "../../token";

export function createSetupComplete(admin: Address, destination: Address, helper: Address, supportedTokens: MockTokenData[]): SetupComplete {
  let event: SetupComplete = changetype<SetupComplete>(newMockEvent());
  event.address = opolisPayMockData.address;
  event.parameters = new Array();

  let adminParam = new ethereum.EventParam(
    "admin",
    ethereum.Value.fromAddress(admin)
  );
  let destinationParam = new ethereum.EventParam(
    "destination",
    ethereum.Value.fromAddress(destination)
  );
  let helperParam = new ethereum.EventParam(
    "helper",
    ethereum.Value.fromAddress(helper)
  );
  let supportedTokensParam = new ethereum.EventParam(
    "supportedTokens",
    ethereum.Value.fromAddressArray(supportedTokens.map<Address>(x => x.address))
  );

  event.parameters.push(adminParam);
  event.parameters.push(destinationParam);
  event.parameters.push(helperParam);
  event.parameters.push(supportedTokensParam);

  return event;
}

export function createStaked(): Staked {
  let event: Staked = changetype<Staked>(newMockEvent());
  event.address = stakingContractMockData.address;
  event.parameters = new Array();

  let stakerParam = new ethereum.EventParam(
    "staker",
    ethereum.Value.fromAddress(accounts[0])
  );
  let memberIdParam = new ethereum.EventParam(
    "memberId",
    ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(10).pow(18))
  );
  let tokenParam = new ethereum.EventParam(
    "token",
    ethereum.Value.fromAddress(opolisPayMockData.supportedTokens[0].address)
  );

  event.parameters.push(stakerParam);
  event.parameters.push(memberIdParam);
  event.parameters.push(amountParam);
  event.parameters.push(tokenParam);

  return event;
}
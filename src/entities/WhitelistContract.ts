import { WhitelistContract } from "./../../generated/schema";
import { Address, BigInt, log } from "@graphprotocol/graph-ts";

export function createWhitelistContract(
  address: Address,
  owner: Address,
  createdAt: BigInt
): void {
  let dbContract: WhitelistContract = new WhitelistContract(address.toHex());

  dbContract.createdAt = createdAt;
  dbContract.owner = owner;
  dbContract.totalUsers = BigInt.fromString("0");
  dbContract.totalWhitelistedUsers = BigInt.fromString("0");
  dbContract.totalEmployeeUsers = BigInt.fromString("0");
  dbContract.totalCoalitionUsers = BigInt.fromString("0");

  dbContract.save();
}

export function increaseWhitelistUserCount(
  whitelistContractAddress: Address,
  isEmployee: boolean
): void {
  let dbContract = WhitelistContract.load(whitelistContractAddress.toHex());
  if (!dbContract) {
    log.error("WhitelistContract doesn't exist at {}!", [
      whitelistContractAddress.toHex()
    ]);
    return;
  }
  dbContract.totalUsers = dbContract.totalUsers.plus(BigInt.fromString("1"));
  dbContract.totalWhitelistedUsers = dbContract.totalWhitelistedUsers.plus(
    BigInt.fromString("1")
  );

  if (isEmployee) {
    dbContract.totalEmployeeUsers = dbContract.totalEmployeeUsers.plus(
      BigInt.fromString("1")
    );
  } else {
    dbContract.totalCoalitionUsers = dbContract.totalCoalitionUsers.plus(
      BigInt.fromString("1")
    );
  }

  dbContract.save();
}

export function decreaseWhitelistUserCount(whitelistContractAddress: Address): void {
  let dbContract = WhitelistContract.load(whitelistContractAddress.toHex());
  if (!dbContract) {
    log.error("WhitelistContract doesn't exist at {}!", [
      whitelistContractAddress.toHex()
    ]);
    return;
  }
  dbContract.totalWhitelistedUsers = dbContract.totalWhitelistedUsers.minus(
    BigInt.fromString("1")
  );

  dbContract.save();
}

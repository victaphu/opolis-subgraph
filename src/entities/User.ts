import { User } from "./../../generated/schema";
import { Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";
import { ensureWallet } from "./Wallet";

export function createUser(
  address: Address,
  isEmployee: boolean,
  isWhitelisted: boolean,
  timestamp: BigInt
): void {
  let dbWallet = ensureWallet(address, timestamp);

  let dbUser = new User(address.toHex());
  dbUser.defaultWallet = dbWallet.id;
  dbUser.preferredWallet = dbWallet.id;
  dbUser.isEmployee = isEmployee;
  dbUser.isWhitelisted = isWhitelisted;
  dbUser.createdAt = timestamp;
  dbUser.totalStakedBalance = BigDecimal.fromString("0");
  dbUser.totalRewardClaimed = BigDecimal.fromString("0");
  dbUser.save();
}

export function isEmployee(address: Address): boolean {
  let dbUser = User.load(address.toHex());

  if (!dbUser) {
    log.error("User with id: {} doesn't exist!", [address.toHex()]);
    return false;
  }
  return dbUser.isEmployee;
}

export function updatePreferredWallet(
  oldPreferredWalletAddress: Address,
  newPreferredWalletAddress: Address,
  timestamp: BigInt
): void {
  let dbOldPreferredWallet = ensureWallet(oldPreferredWalletAddress, timestamp);
  let dbUser = User.load(dbOldPreferredWallet.user);

  if (!dbUser) {
    log.error("User with id: {} doesn't exist!", [dbOldPreferredWallet.user]);
    return;
  }

  let dbPreferredWallet = ensureWallet(newPreferredWalletAddress, timestamp);
  dbUser.preferredWallet = dbPreferredWallet.id;
  dbUser.save();
}

export function removeUserFromWhitelist(address: Address): void {
  let dbUser = User.load(address.toHex());

  if (!dbUser) {
    log.error("User with id: {} doesn't exist!", [address.toHex()]);
    return;
  }

  dbUser.isWhitelisted = false;
  dbUser.save();
}

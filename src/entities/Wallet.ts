import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Wallet } from "../../generated/schema";

export function ensureWallet(address: Address, timestamp: BigInt): Wallet {
  let walletId = address.toHex();
  let dbWallet = Wallet.load(walletId);
  if (dbWallet) return dbWallet;

  dbWallet = new Wallet(walletId);
  dbWallet.user = walletId;
  dbWallet.createdAt = timestamp;
  dbWallet.save();
}

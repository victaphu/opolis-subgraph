import { Address } from "@graphprotocol/graph-ts";
import { OpolisPayToken } from "../../generated/schema";
import { ensureToken } from "./Token";

export function ensureOpolisPayToken(
  tokenAddress: Address,
  opolisPayAddress: Address
): OpolisPayToken {
  let opolisPayTokenId =
    opolisPayAddress.toHex() + "-" + tokenAddress.toHex();
  let dbOpolisPayToken = OpolisPayToken.load(opolisPayTokenId);
  if (!dbOpolisPayToken) {
    let dbToken = ensureToken(tokenAddress);
    dbOpolisPayToken = new OpolisPayToken(opolisPayTokenId);
    dbOpolisPayToken.token = dbToken.id;
    dbOpolisPayToken.opolisPayContract = opolisPayAddress.toHex();
    dbOpolisPayToken.save();
  }
  return dbOpolisPayToken as OpolisPayToken;
}

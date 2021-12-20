import { Address } from "@graphprotocol/graph-ts";
import { OpolisPayToken } from "../../generated/schema";
import { ensureToken } from "./Token";

export function ensureOpolisPayToken(
  tokenAddress: Address,
  opolisPayAddress: Address
): OpolisPayToken {
  let dbOpolisPayToken = OpolisPayToken.load(tokenAddress.toHex());
  if (!dbOpolisPayToken) {
    let dbToken = ensureToken(tokenAddress);
    let opolisPayTokenId =
      opolisPayAddress.toHex() + "-" + tokenAddress.toHex();
    dbOpolisPayToken = new OpolisPayToken(opolisPayTokenId);
    dbOpolisPayToken.token = dbToken.id;
    dbOpolisPayToken.opolisPayContract = opolisPayAddress.toHex();
    dbOpolisPayToken.save();
  }
  return dbOpolisPayToken as OpolisPayToken;
}

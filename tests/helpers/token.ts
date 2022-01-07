import { Address, BigInt } from "@graphprotocol/graph-ts";

export class MockTokenData {
  public readonly address: Address;
  public readonly decimals: u8;
  public readonly name: string;
  public readonly symbol: string;
  public readonly totalSupply: BigInt;

  constructor(
    address: Address,
    decimals: u8,
    name: string,
    symbol: string,
    totalSupply: BigInt
  ) {
    this.address = address;
    this.decimals = decimals;
    this.name = name;
    this.symbol = symbol;
    this.totalSupply = totalSupply;
  }
}

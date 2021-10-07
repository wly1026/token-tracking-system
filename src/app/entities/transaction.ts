import { Player } from "./player";

export class Transaction {
  type: string;
  value: number;
  date: Date;
  // playerId: string;

  constructor(type: string, value: number, date: Date) {
    this.type = type;
    this.value = value;
    this.date = date;
  }
}

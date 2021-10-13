
export class Transaction {
  description: string;
  value: number;
  date: Date;
  playerId: string;

  constructor(description: string, value: number, date: Date, playerId: string) {
    this.description = description;
    this.value = value;
    this.date = date;
    this.playerId = playerId;
  }
}

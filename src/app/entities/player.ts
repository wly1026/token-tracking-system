export class Player {
  id: string;
  userName: string;
  tokens: number;

  constructor(id: string, userName: string, tokens: number) {
    this.id = id;
    this.userName = userName;
    this.tokens = tokens;
  }
}

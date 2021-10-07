import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../entities/player';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  players:Player[] = [];

  constructor() { }

  save(name: string): Observable<Player> {
    let idx = this.players.findIndex(x => x.userName == name);
    let player: Player;
    if (idx >= 0) {
      player = this.players[idx];
    } else {
      player = new Player((this.players.length + 1) + "", name, 0);
      this.players.push(player);
    }
    return of(player);
  }

  getPlayer(id: string): Observable<Player> {
    let player = this.players.filter(x => x.id == id)[0];
    return of(player);
  }

  addToken(amount: number, id: string) {
    let idx = this.players.findIndex(x => x.id == id);
    this.players[idx].tokens += amount;

  }

  minusToken(amount: number, id: string) {
    let idx = this.players.findIndex(x => x.id == id);
    this.players[idx].tokens -= amount;
  }

  getTokens(id: string): Observable<number> {
    let tokens = this.players.filter(x => x.id == id)[0].tokens;
    return of(tokens);
  }
}

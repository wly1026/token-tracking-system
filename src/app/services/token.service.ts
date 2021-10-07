import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../entities/transaction';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenPerPlay = 4;
  private gameName = "Sonic Adventure Game";

  transactions: Transaction[] = [];
  constructor(private userService: UserService) {
  }

  refill(amount: number, id: string): Observable<Transaction> {
    this.userService.addToken(amount, id);

    let newOrder: Transaction = new Transaction("Card Refill", amount, new Date(), id);
    this.transactions.push(newOrder);
    return of(newOrder);
  }

  play(id: string): Observable<Transaction> {
    this.userService.minusToken(this.tokenPerPlay, id);

    let newOrder: Transaction = new Transaction(this.gameName, -this.tokenPerPlay, new Date(), id);
    this.transactions.push(newOrder);
    return of(newOrder);
  }

  getTransactions(id: string): Observable<Transaction[]> {
    let lists: Transaction[] = this.transactions.filter(x => x.playerId == id);
    return of(lists)
  }
}

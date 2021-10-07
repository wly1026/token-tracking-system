import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../entities/transaction';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenPerPlay = 4;

  currToken: number
  transactions: Transaction[] = [];
  constructor() {
    this.currToken = 4;
  }

  getCurrentToken(): Observable<number> {
    return of(this.currToken);
  }

  refill(amount: number): Observable<Transaction> {
    this.currToken += amount;
    console.log("currentToken: " + this.currToken);

    let newOrder: Transaction = new Transaction("refill", amount, new Date());
    this.transactions.push(newOrder);
    return of(newOrder);
  }

  play(): Observable<Transaction> {
    this.currToken -= this.tokenPerPlay;
    console.log("currentToken: " + this.currToken);

    let newOrder: Transaction = new Transaction("play", -this.tokenPerPlay, new Date());
    this.transactions.push(newOrder);
    return of(newOrder);
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions)
  }
}

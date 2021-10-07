import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/entities/player';
import { Transaction } from 'src/app/entities/transaction';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css']
})
export class PlayingComponent implements OnInit {
  private tokenPerPlay = 4;
  currToken: number;
  transactions: Transaction[] = [];

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getCurrentToken();
  }

  getCurrentToken() {
    this.tokenService.getCurrentToken()
    .subscribe(data => {
      this.currToken = data;
    });
  }

  refill(amount: string) {
    //validate the amount
    if (!amount || parseInt(amount) <= 0) {
      alert("Please enter a number, at least 1");
      return;
    }

    this.tokenService.refill(parseInt(amount)).subscribe(data => this.transactions.push(data));
    this.getCurrentToken();
  }

  play() {
    // validate if the player has enough tokens
    if (this.currToken < this.tokenPerPlay) {
      alert("You don't have enough tokens. Please refill");
      return;
    }

    this.tokenService.play().subscribe(data => this.transactions.push(data));
    this.getCurrentToken();
  }

  getTransactions() {
    this.tokenService.getTransactions()
    .subscribe(data => this.transactions = data);
  }




}

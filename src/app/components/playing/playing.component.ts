import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../../app/entities/player';
import { Transaction } from '../../../app/entities/transaction';
import { TokenService } from '../../../app/services/token.service';
import { UserService } from '../../../app/services/user.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css']
})
export class PlayingComponent implements OnInit {
  private tokenPerPlay = 4;
  transactions: Transaction[] = [];
  player: Player;
  currToken: number;

  constructor(private tokenService: TokenService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  /**
   * Initialize player, transactions, currToken.
   */
  ngOnInit(): void {
    const userId: string = this.route.snapshot.paramMap.get("userId")!;
    this.userService.getPlayer(userId)
      .subscribe(arg => {
        this.player = arg;
      });
    this.getTransactions();
    this.getTokens();
  }

  /**
   * call service to create a refill transation. Update transactions array and currToken
   * @param amount the amount of tokens
   */
  refill(amount: string) {
    //validate the amount
    if (!amount || parseInt(amount) <= 0) {
      alert("Please enter a number, at least 1");
      return;
    }
    this.tokenService.refill(parseInt(amount), this.player.id).subscribe(data => {
      this.transactions.push(data);
      this.currToken += parseInt(amount);
    });
  }

  /**
   * call service to create a play transaction. Update transactions array and currToken
   */
  play() {
    // validate if the player has enough tokens
    if (this.currToken < this.tokenPerPlay) {
      alert("You don't have enough tokens. Please refill");
      return;
    }

    this.tokenService.play(this.player.id).subscribe(data => {
      this.transactions.push(data);
      this.currToken -= this.tokenPerPlay;
    });
  }

  getTransactions() {
    this.tokenService.getTransactions(this.player.id)
    .subscribe(data => this.transactions = data);
  }

  getTokens() {
    this.userService.getTokens(this.player.id)
    .subscribe(data => this.currToken = data);
  }

}

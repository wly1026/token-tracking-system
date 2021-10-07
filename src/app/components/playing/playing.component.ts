import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/entities/player';
import { Transaction } from 'src/app/entities/transaction';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

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

  ngOnInit(): void {
    const userId: string = this.route.snapshot.paramMap.get("userId")!;
    this.userService.getPlayer(userId)
      .subscribe(arg => {
        this.player = arg;
      });
    this.getTransactions();
    this.getTokens();
  }

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
    // this.getTokens();
  }

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
    // this.getTokens();
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

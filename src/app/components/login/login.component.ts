import { Component, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/entities/player';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  player: Player;

  constructor() { }

  ngOnInit(): void {
  }

  save(name: String){
      name = name.trim();

  }
}

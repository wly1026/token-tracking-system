import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../../app/entities/player';
import { UserService } from '../../../app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  player: Player;
  @Output() newItemEvent = new EventEmitter<Player>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * call service to create/identify a user
   * @param name userName which should be unique
   */
  save(name: string){
      name = name.trim();
      this.userService.save(name)
        .subscribe(arg => {
          this.player = arg;
          this.router.navigateByUrl(`/${this.player.id}/playing`);
        });
  }
}

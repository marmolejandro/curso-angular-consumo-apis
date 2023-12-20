import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store';

  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService
  ){
  }

  createUser(){
    this.UsersService.create({
      name: 'alejo',
      email: 'alejo@gmail.com',
      password: '121212'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  login(){
    this.AuthService.login('alejo@gmail.com', '121212')
    .subscribe(rta => {
      console.log(rta.access_token);
    })
  }
}

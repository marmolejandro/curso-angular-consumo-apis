import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store';
  token = '';

  constructor(
    private usersService: UsersService
  ){
  }

  createUser(){
    this.usersService.create({
      name: 'alejo',
      email: 'alejo@gmail.com',
      password: '121212'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }
}

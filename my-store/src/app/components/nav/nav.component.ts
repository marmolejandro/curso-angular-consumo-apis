import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private storeService: StoreService
  ){}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('alejo@gmail.com', '121212')
    .subscribe(rta => {
      this.token = rta.access_token;
      console.log(this.token);
      this.getProfile();
    })
  }

  getProfile(){
    console.log(this.token);
    this.authService.profile(this.token)
    .subscribe(profile => {
      console.log(profile);
      this.profile = profile;
    });
  }
}

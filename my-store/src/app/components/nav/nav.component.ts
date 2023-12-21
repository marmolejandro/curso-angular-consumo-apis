import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { switchMap, tap } from 'rxjs/operators';

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
    // Se consume servicio de login
    this.authService.login('alejo@gmail.com', '121212')
    .pipe(
      tap(token => {
        console.log(this.token);
        this.token = token.access_token;
      }),
      switchMap(() => {
        // Se consume servicio de obtener perfil
        return this.authService.profile(this.token)

      })
    )
    .subscribe(profile => {
        console.log(profile);
        this.profile = profile;
      }
    );
  }
}

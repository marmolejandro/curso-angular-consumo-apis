import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { User, CreateUserDTO } from './../models/user.model'
import { Auth } from './../models/auth.model'
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Para implementacion de ambientes
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token)),
    );
  }
  
  getProfile(){
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // return this.http.get<User>(`${this.apiUrl}/profile`, {headers});
    return this.http.get<User>(`${this.apiUrl}/profile`, {});
  }

  loginAndGet(email: string, password: string){
    console.warn(localStorage)
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile())
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { User, CreateUserDTO } from './../models/user.model'
import { Auth } from './../models/auth.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Para implementacion de ambientes
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient
  ) {}

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password});
  }
  
  profile(token: string){
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }
}

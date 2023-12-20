import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment'
import { User, CreateUserDTO } from './../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // Para implementacion de ambientes
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient
  ) {}
}

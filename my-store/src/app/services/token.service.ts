import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // Para implementacion de ambientes
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private cookieService: CookieService
  ) {}

  localStorage = {};

  saveToken(token: string){
    this.removeToken();
    this.cookieService.set('token', token);

    const prueba = this.getToken();
    console.warn(`prueba: ${prueba}`)
  }

  getToken(){
    const token = this.cookieService.get("token")
    return token;
  }

  removeToken() {
    this.cookieService.deleteAll('/')
    this.cookieService.delete("token", '/');
  }
}

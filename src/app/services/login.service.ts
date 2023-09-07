import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginToken } from '../models/logintoken.model';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  login( usuario: LoginToken): Observable<any> {
    usuario.codigoSistema=environment.NOMBRE_SISTEMA;
    return this.http.post(environment.URL_SEG_TOKEN, usuario, this.httpOptions);
  }

  getTokenDecoded(): any {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    } else {
      console.log('No se encontró el token en el localStorage');
    }
  }

  removeLocalStorage(){ 
    localStorage.removeItem('token');
  }

  getTokenOfLocalStorage () {
    return localStorage.getItem('token') ? true : false;
  }

  
}

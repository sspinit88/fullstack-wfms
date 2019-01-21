import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;

  constructor(
      private http: HttpClient,
  ) {
  }

  login(user: UserModel): Observable<{ token: string }> { // вернет с сервера
    return this.http.post<{ token: string }>('/api/auth/login', user)
        .pipe(
            tap( // tap - позволяет занести значение получаемого токена в переменную token
                ({token}) => { // получаем объект с полем token
                  console.log('token:', {token});

                  localStorage.setItem('auth-token', token);
                  this.setToken(token);
                }
            )
        );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuth(): boolean { // проверяет есть token или нет
    return !!this.token; // !! - риводим к boolean
  }

  logout() {
    this.setToken(null);
    localStorage.clear;
  }

  register() {

  }


}

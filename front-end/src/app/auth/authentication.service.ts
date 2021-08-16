import { ShopOwner } from './../@business/model/shop_owner';
import { environment } from './../../environments/environment';
import { User } from './../@business/model/user';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host: string = environment.baseURL;

  private token!: string;
  public loggedInUserName!: string;
  private jwtHelper = new   JwtHelperService();

  private iss = {
    login: `${this.host}/api/login`,
    signup: `${this.host}/api/signup`
  };

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/api/auth/login`, user);
  }

  public register(shopOwner: ShopOwner): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/api/auth/register`, shopOwner);
  }

  public logOut(): void {
    this.token = "";
    this.loggedInUserName = "";
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token')!;
  }

  public getToken(): string {
    return this.token;
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  // public isLoggedIn(): boolean {
  //   this.loadToken();
  //   if (this.token != null && this.token !== '') {
  //     if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
  //       if (this.jwtHelper.isTokenExpired(this.token)) {
  //         this.loggedInUserName = this.jwtHelper.decodeToken(this.token).sub;
  //         return true;
  //       }
  //     }
  //   } else {
  //     this.logOut();
  //     return false;
  //   }
  //   return false;
  // }

  isValid() {
    this.loadToken();
    const token = this.getToken();
    if (token != null && token !== '') {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token:any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload:any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }





}
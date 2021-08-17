import { User } from './../@business/model/user';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.auth.loggedIn());
  private loggedInUserDetails = new BehaviorSubject<User>(this.auth.getUserFromLocalCache());

  authStatus = this.loggedIn.asObservable();
  userDetails = this.loggedInUserDetails.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
  changeUserDetails(user:User){
    this.loggedInUserDetails.next(user);
  }

  constructor(private auth: AuthenticationService) { }
}

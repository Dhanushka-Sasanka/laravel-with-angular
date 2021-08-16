import { AuthenticationService } from './../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public loggedIn?: boolean ;
  public loggedInUser: any;
  

  constructor(private auth: AuthService,
    private router: Router,
    private authenticationService: AuthenticationService){
      this.auth.authStatus.subscribe(value => this.loggedIn = value);
     }

  ngOnInit(): void {
    
    this.loggedInUser = this.authenticationService.loggedInUserName;
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    
    this.auth.changeAuthStatus(false);
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }

}

import { NotificationService } from './../../@business/services/notification.service';
import { User } from './../../@business/model/user';
import { AuthenticationService } from './../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/@business/enum/notificaiton-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public loggedIn: boolean = true;
  public loggegInUserDetails?: User;


  constructor(private auth: AuthService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification:NotificationService) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value => { this.loggedIn = value; console.log(value) });
    this.auth.userDetails.subscribe((value:any) => { this.loggegInUserDetails = value; console.log(value) });
    this.notification.notify(NotificationType.SUCCESS, `Log as ${this.loggegInUserDetails?.email}` );
  }

  logout(event: MouseEvent) {
    event.preventDefault();

    this.auth.changeAuthStatus(false);
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }

}
function value(value: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}


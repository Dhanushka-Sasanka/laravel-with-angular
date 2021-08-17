import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {User} from '../../@business/model/user';
import {AuthService} from '../../auth/auth.service';
import {NotificationService} from '../../@business/services/notification.service';
import {NotificationType} from '../../@business/enum/notificaiton-type.enum';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  public loggedInUserDetails: User;

  constructor(private auth: AuthService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notification: NotificationService) {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    this.auth.userDetails.subscribe((value: any) => {
      this.loggedInUserDetails = value;
      console.log(value);
    });
    this.notification.notify(NotificationType.SUCCESS, `Log as ${this.loggedInUserDetails.email}`);
  }

  logout(event: MouseEvent) {
    event.preventDefault();

    this.auth.changeAuthStatus(false);
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }

}

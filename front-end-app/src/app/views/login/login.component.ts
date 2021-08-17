import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../auth/authentication.service';
import {NotificationService} from '../../@business/services/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../@business/model/user';
import {NotificationType} from '../../@business/enum/notificaiton-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  error: any;
  loggingData: any;

  constructor(private authentication: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router,
              private auth: AuthService) {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    // if (!this.authentication.loggedIn()) {
    //   console.log(this.authentication.loggedIn());
    //   this.router.navigateByUrl('/dashboard')
    // }
  }

  login() {

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const user = new User();
    user.email = email;
    user.password = password;
    this.authentication.login(user).subscribe(responce => {

        console.log(responce);
        this.loggingData = responce;
        this.authentication.saveToken(this.loggingData.access_token);
        const tempUser = new User();
        tempUser.email = this.loggingData.user;
        this.authentication.addUserToLocalCache(tempUser);
        this.auth.changeUserDetails(tempUser);
        this.auth.changeAuthStatus(true);
        this.router.navigateByUrl('/dashboard');

      },
      error => {
        this.handleError(error);
      });

  }

  handleError(error: any) {

    this.error = error.error.error;
    console.log(this.error);
    this.notificationService.notify(NotificationType.ERROR, this.error);

  }

  handleResponce() {
    console.log(this.loggingData.access_token);
    console.log(this.loggingData.user);
  }

}

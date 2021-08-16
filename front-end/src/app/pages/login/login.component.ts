import { AuthService } from './../../auth/auth.service';
import { NotificationType } from './../../@business/enum/notificaiton-type.enum';
import { NotificationService } from './../../@business/services/notification.service';
import { User } from './../../@business/model/user';
import { AuthenticationService } from './../../auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  ngOnInit(): void { }

  login() {

    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    const user = new User();
    user.email = email;
    user.password = password;
    this.authentication.login(user).subscribe(responce => {

      console.log(responce);
      this.loggingData = responce;
      this.authentication.saveToken(this.loggingData.access_token);
      this.authentication.loggedInUserName = this.loggingData.user;
    
      this.auth.changeAuthStatus(true);
      this.router.navigateByUrl('/dashboard')

    },
      error => {
        this.handleError(error)
      });

  }

  handleError(error: any) {

    this.error = error.error.error;
    this.notificationService.notify(NotificationType.ERROR, this.error);

  }

  handleResponce() {
    console.log(this.loggingData.access_token);
    console.log(this.loggingData.user);


  }




}

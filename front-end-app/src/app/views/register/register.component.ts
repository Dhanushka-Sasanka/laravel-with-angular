import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../auth/authentication.service';
import {NotificationService} from '../../@business/services/notification.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ConfirmedValidator} from '../../@business/validators/confirmed.validator';
import {ShopOwner} from '../../@business/model/shop_owner';
import {NotificationType} from '../../@business/enum/notificaiton-type.enum';
import {User} from '../../@business/model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: any;
  submitted = false;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) {


    this.registerForm = this.formBuilder.group(
      {
        fullname : ['', Validators.required],
        shopname : [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [ConfirmedValidator.match('password', 'confirmPassword')]
      }
    );

    // this.registerForm = new FormGroup({
    //   'name': new FormControl(null, Validators.required),
    //   'shopname': new FormControl(null, Validators.required),
    //   'email': new FormControl(null, [Validators.required, Validators.email]),
    //   'password': new FormControl(null, Validators.required),
    //   'confirm_password': new FormControl(null, Validators.compose([ Validators.required , ConfirmedValidator(password, confirm_password) ]))
    // });

    // this.registerForm = fb.group({
    //   password: ['', [Validators.required]],
    //   confirm_password: ['', [Validators.required]]
    // }, {
    //   validator: ConfirmedValidator('password', 'confirm_password')
    // })
    // this.registerForm = this.formBuilder.group(
    // {
    //   firstName: ["", [Validators.required]],
    //   lastName: ["", [Validators.required]],
    //   email: ["", [Validators.required, Validators.email]],
    //   password: ["", [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ["", Validators.required]
    // },
    // {
    //   // Used custom form validator name
    //   validator: ConfirmedValidator("password", "confirmPassword")
    // }


  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  ngOnInit(): void {


  }

  register() {
    console.log('reg');
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const fullname = this.registerForm.get('fullname').value;
    const shopname = this.registerForm.get('shopname').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const acceptTerms = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;


    // console.log(JSON.stringify(this.registerForm.value, null, 2));


    const shopOwner = new ShopOwner();

    shopOwner.fullname = fullname;
    shopOwner.shopname = shopname;
    shopOwner.email = email;
    shopOwner.password = password;
    shopOwner.confirmPassword = confirmPassword;
    shopOwner.acceptTerms = acceptTerms;

    this.authenticationService.register(shopOwner).subscribe((responce) => {
      console.log(responce);
      this.handleResponce(responce);
    }, error => {
      this.handleError(error);
    });

  }

  handleError(error: any) {

    this.error = error.error.errors;
    this.notificationService.notify(NotificationType.ERROR, error.error.message);
    // this.error.forEach((element: string) => {

    // });


  }

  onReset(): void {
    this.submitted = false;
    // this.registerForm.reset();
  }

  handleResponce(responce: any) {

    this.authenticationService.saveToken(responce.access_token);
    const tempUser = new User();
    tempUser.email = responce.user;
    this.authenticationService.addUserToLocalCache(tempUser);
    this.auth.changeUserDetails(tempUser);
    this.router.navigateByUrl('/dashboard');

  }
}

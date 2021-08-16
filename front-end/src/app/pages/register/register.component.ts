import { AuthService } from 'src/app/auth/auth.service';
import { ShopOwner } from './../../@business/model/shop_owner';
import { NotificationType } from './../../@business/enum/notificaiton-type.enum';
import { User } from './../../@business/model/user';
import { NotificationService } from './../../@business/services/notification.service';
import { AuthenticationService } from './../../auth/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmedValidator } from 'src/app/@business/validators/confirmed.validator';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
        fullname: ['', Validators.required],
        shopname: [
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

  ngOnInit(): void {



  }

  register() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    let fullname = this.registerForm.get('fullname')!.value;
    let shopname = this.registerForm.get('shopname')!.value;
    let email = this.registerForm.get('email')!.value;
    let password = this.registerForm.get('password')!.value;
    let acceptTerms = this.registerForm.get('password')!.value;
    let confirmPassword = this.registerForm.get('confirmPassword')!.value;


    console.log(JSON.stringify(this.registerForm.value, null, 2));


    const shopOwner = new ShopOwner();

    shopOwner.fullname = fullname;
    shopOwner.shopname = shopname;
    shopOwner.email = email;
    shopOwner.password = password;
    shopOwner.confirmPassword = confirmPassword;
    shopOwner.acceptTerms = acceptTerms;

    this.authenticationService.register(shopOwner).subscribe(responce => { this.handleResponce(responce) }, error => { this.handleError(error) });

  }

  handleError(error: any) {

    this.error = error.error.errors;
    this.notificationService.notify(NotificationType.ERROR, this.error);
    // this.error.forEach((element: string) => {

    // });


  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }



  onReset(): void {
    this.submitted = false;
    // this.registerForm.reset();
  }

  handleResponce(responce: any) {

    this.authenticationService.saveToken(responce.access_token);
    const tempUser = new User();
    tempUser.email = responce.email;
    this.authenticationService.addUserToLocalCache(tempUser);
    this.auth.changeUserDetails(tempUser);
    this.router.navigateByUrl('/dashboard')

  }

}

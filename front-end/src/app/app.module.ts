import { NotificationModule } from './notification.module';
import { NotificationService } from './@business/services/notification.service';
import { AuthenticationService } from './auth/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmedValidator } from './@business/validators/confirmed.validator';
import { AuthService } from './auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [AuthenticationService,NotificationService ,AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

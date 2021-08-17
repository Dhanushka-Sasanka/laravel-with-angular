// Angular
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Components Routing
import {BaseRoutingModule} from './base-routing.module';
import {CustomerComplainComponent} from './customer-complain/customer-complain.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    CustomerComplainComponent
  ]
})
export class BaseModule { }

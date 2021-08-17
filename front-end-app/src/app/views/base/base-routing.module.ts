import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {CustomerComplainComponent} from './customer-complain/customer-complain.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'complains'
      // },
      {
        path: 'complains',
        component: CustomerComplainComponent,
        data: {
          title: 'Customer Complains'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}

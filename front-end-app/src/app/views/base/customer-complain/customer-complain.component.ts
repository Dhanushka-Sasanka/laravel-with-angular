import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-complain',
  templateUrl: './customer-complain.component.html',
  styleUrls: ['./customer-complain.component.css']
})
export class CustomerComplainComponent implements OnInit {

  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

}

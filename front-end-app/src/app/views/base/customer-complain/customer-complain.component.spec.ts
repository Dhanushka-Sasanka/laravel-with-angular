import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComplainComponent } from './customer-complain.component';

describe('CustomerComplainComponent', () => {
  let component: CustomerComplainComponent;
  let fixture: ComponentFixture<CustomerComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

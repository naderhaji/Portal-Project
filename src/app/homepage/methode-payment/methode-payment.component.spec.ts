import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodePaymentComponent } from './methode-payment.component';

describe('MethodePaymentComponent', () => {
  let component: MethodePaymentComponent;
  let fixture: ComponentFixture<MethodePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodePaymentComponent]
    });
    fixture = TestBed.createComponent(MethodePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from 'src/app/services/payment.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-methode-payment',
  templateUrl: './methode-payment.component.html',
  styleUrls: ['./methode-payment.component.scss'],
})
export class MethodePaymentComponent implements OnInit, OnDestroy {
  onlinePayment = false;
  bankTransfer = false;
  paymentByCheck = false;
  type: string = '';
  @Input() bodytest: any;
  @Output() paymentType: EventEmitter<any> = new EventEmitter();
  @Output() orderId: EventEmitter<any> = new EventEmitter();

  payForm: FormGroup;
  submitted: boolean;

  orderId$: Observable<any>;
  orderIdSubscription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {
    this.payForm = this.formBuilder.group({
      sendChoose: [''],
    });
  }

  ngOnInit(): void {
    console.log('form enter', this.bodytest);
  }

  changeStatus(type: string) {
    this.type = type;
    this.onlinePayment = type === 'paiement en ligne';
    this.bankTransfer = type === 'virement bancaire';
    this.paymentByCheck = type === 'paiement par chèque';
  }

  sendChoose() {
    this.orderId$ = this.paymentService.createOrderId(this.bodytest);

    this.orderIdSubscription = this.orderId$.subscribe((res) => {
      this.orderId.emit({
        orderId: res.result.sale_order_id,
        type: this.type,
      });
      this.activeModal.close();
    });
  }

  createOrderId() {
    console.log(this.payForm.value);
    this.submitted = true;
    if (this.payForm.invalid) {
      return;
    }
  }

  ngOnDestroy() {
    if (this.orderIdSubscription) {
      this.orderIdSubscription.unsubscribe();
    }
  }
}

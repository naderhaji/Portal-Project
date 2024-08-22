import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PackagesService } from 'src/app/services/packages/packages.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.scss']
})
export class BankTransferComponent {
  typePayment:any;
  bankTransfer=false;
  PaymentCheck=false;
  type: string = '';
  @Input() bodytest: any;
  @Output() payment_type: EventEmitter<any> = new EventEmitter();
  pay_form = new FormGroup({
    sendChoose: new FormControl(''),
  });
  modal: any;
  submitted: boolean;
  orderId : any
  articles: any;
  selectedArticle: any;
  selectedArticleId: string;
  constructor(private activatedRoute: ActivatedRoute ,
    private paymentserv: PaymentService,
    private packagesService: PackagesService) {}

  ngOnInit(){
    this.typePayment=this.activatedRoute.snapshot.params['type_payment'];
    this.orderId = this.activatedRoute.snapshot.params['orderId']
    console.log('test',this.typePayment)
    if(this.typePayment==='VB'){
      this.bankTransfer=true;
      this.PaymentCheck=false
    }else if(this.typePayment==='PC'){
      this.PaymentCheck=true;
      this.bankTransfer=false;
    }
    this.packagesService.getAllArticles()
    .subscribe((data: any) => {
      this.articles = data;
      this.selectedArticleId = localStorage.getItem('price');
      this.setSelectedArticle();



    });


  }


  setSelectedArticle() {
    this.selectedArticle = this.articles.find(article => article.id === this.selectedArticleId);
  }


  sendChoose() {
    console.log("#11111111111111111111111111111")
    console.log(this.bodytest)
    this.payment_type.emit(this.type);
    this.paymentserv.createOrderId(this.bodytest).subscribe(res => {
      this.orderId.emit(res.result.sale_order_id,)
      console.log(res)
      this.modal.close();

    },
    error => {

    })

    // this.paymentserv.createOrderId(body).subscribe((data: any) => {
    //   console.log("heeeeloooo")
    //   console.log(data);
    //   // this.payment_type.emit(true);
    //   this.activeModal.close();
    // });

  }

  createOrderId() {
    console.log(this.pay_form.value);
    this.submitted = true;
    if (this.pay_form.invalid) {
      return;
    }

  }
}

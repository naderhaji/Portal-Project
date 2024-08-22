import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  createPayment(paymentData: { jsonrpc: string; params: { partner_id: number; email: string; identifiant_internet: string; date: string; }; }) {
    throw new Error('Method not implemented.');
  }
  baseUrl!: any;
  public AppParameters!: any;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.AppParameters = this.configService.config;
    this.baseUrl = this.AppParameters;
  }


  initPay( amount : number) {
    let header = new HttpHeaders({
      'x-api-key': '648835de5918ffe19497b65a:OxIP3iLX74shG41Bo',
    });
    let body = {
      receiverWalletId: this.baseUrl.receiverWalletId,
      amount: amount*1000,
      token: "EUR",
      successUrl:`${this.baseUrl.url}` ,
      failUrl: `${this.baseUrl.url}`,
    };
    return this.http
      .post(
        this.baseUrl.apiUrlKonnectPost,
        body,
        {
          headers: header,
        }
      )
      .toPromise();
  }

  getDetailsPay(paymentId: string) {
    let header = new HttpHeaders({
      'x-api-key': '648835de5918ffe19497b65a:OxIP3iLX74shG41Bo',
    });
    return this.http
      .get(this.baseUrl.apiUrlKonnectGet + paymentId, {
        headers: header,
      })
      .toPromise();
  }

  createOrderId(body:any){
    return this.http.post<any>(location.origin  +'/odoo/create_sale_order',
    body);
  }

}

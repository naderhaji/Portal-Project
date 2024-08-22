import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl!: any;
  public AppParameters!: any;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.AppParameters = this.configService.config;
    this.baseUrl = this.AppParameters.apiUrl;
  }


  /*createCompany(company:any){
    let url: string = `${this.baseUrl}api/Admin/CreateCompany`;
    return this.http.post(url,company).toPromise()
  }
*/


  createCompanypay(paymentData: any) {
    const headers = new HttpHeaders({

      'Access-Control-Allow-Origin':'*',

      'Content-Type': 'application/json'

      });

    return this.http.post(location.origin + '/odoo/create_payment',paymentData,).toPromise();
  }
}

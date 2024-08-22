import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  constructor(private http: HttpClient) {}

  getAllArticles() {
    return this.http.get(location.origin + '/odoo/get_all_article');
  }
}

import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FAQPageComponent } from './faq-page/faq-page.component';
import { BankTransferComponent } from './homepage/bank-transfer/bank-transfer.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'faq', component: FAQPageComponent },
  {path:'bank-transfer/:type_payment/:orderId', component:BankTransferComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutinModule {}

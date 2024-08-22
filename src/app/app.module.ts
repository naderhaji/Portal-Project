import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { RouterModule, Routes } from '@angular/router';
import { FAQPageComponent } from './faq-page/faq-page.component';
import { AppRoutinModule } from './app-routin.module';
import { HomepageComponent } from './homepage/homepage.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigModule, ConfigService } from './services/config/config.service';
import { PaginatorModule } from 'primeng/paginator';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { PackagesComponent } from './features/packages/packages.component';
import { AddCompanyComponent } from './features/add-company/add-company.component';
import { AboutComponent } from './features/about/about.component';
import { KeyFeaturesComponent } from './features/key-features/key-features.component';
import { ChooseUsComponent } from './features/choose-us/choose-us.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ContactComponent } from './features/contact/contact.component';
import { MessageService } from 'primeng/api';
import { MethodePaymentComponent } from './homepage/methode-payment/methode-payment.component';
import { BankTransferComponent } from './homepage/bank-transfer/bank-transfer.component';
import { StatusDialogComponent } from './homepage/status-dialog/status-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    FAQPageComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    PackagesComponent,
    AddCompanyComponent,
    AboutComponent,
    KeyFeaturesComponent,
    ChooseUsComponent,
    NavbarComponent,
    ContactComponent,
    MethodePaymentComponent,
    BankTransferComponent,
    StatusDialogComponent,
  ],
  imports: [
    AppRoutinModule,
    BrowserModule,
    FormsModule,
    CarouselModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginatorModule,
    BrowserAnimationsModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient],
      },
    }),
    ToastModule,
  ],
  exports: [MethodePaymentComponent],
  providers: [ConfigService, ConfigModule.init(), MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function translateFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

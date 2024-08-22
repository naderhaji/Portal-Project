import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { CompanyService } from '../services/company.service';
import { PaymentService } from '../services/payment.service';
import { MessageService } from 'primeng/api';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MethodePaymentComponent } from './methode-payment/methode-payment.component';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { phonesNumber } from '../core/models/phone';
import { countries } from '../core/models/countrie';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  title = 'LMS-Project-Front';
  @ViewChild('inputFile') myInputVariable: ElementRef;
  price: any;
  loading = false;
  form: FormGroup;
  form2: FormGroup;
  contactForm: FormGroup;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  refPayment: string | null = '';
  preferredCountries: CountryISO[] = [CountryISO.Tunisia, CountryISO.France];
  type: number = 0;
  pays = countries;
  numberCountry = 216;
  flag = 'tn';
  phones = phonesNumber;
  @ViewChild('select_box') select_box: any;
  @ViewChild('olEle') olEle: any;
  @ViewChild('search_box') search_box: any;
  @ViewChild('input_box') input_box: any;
  @ViewChild('selected_option') selected_option: any;
  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    public translateService: TranslateService,
    private companyServ: CompanyService,
    private payService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private route: Router
  ) {
    translateService.addLangs(['fr', 'en', 'ar']);
    translateService.setDefaultLang('fr');
  }
  ngOnInit(): void {
    // this.createCompany();
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
      NameSpace: ['', Validators.required],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          ),
        ],
      ],
      Number: ['', [Validators.required, Validators.pattern(/^.{8}$/)]],
      Pays: ['', Validators.required],
      Kbis_Mf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
        ],
      ],
      UrlWebSite: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
        ],
      ],
      Logo: [null, Validators.required],
      order_lines: [''],
    });

    this.refPayment =
      this.activatedRoute.snapshot.queryParamMap.get('payment_ref');
    if (this.refPayment) {
      this.payService.getDetailsPay(this.refPayment).then((details: any) => {
        if (details.payment.status == 'completed') {
          this.createCompany();
        } else if (details.payment.status == 'pending') {
          // echec de paiement
          Swal.fire({
            icon: 'error',
            title: 'Oups !',
            text: `Paiement non abouti. `,
          });
        }
      });
    }
    // const modalRef = this.modalService.open(StatusDialogComponent, {
    //   size: 'lg',
    //   centered: true,
    // });
    // modalRef.componentInstance.status = 'success';
  }

  // postpay() {
  // this.f['Name'].setValue("qdzdq")

  //
  //}

  translateSite(langauge: string) {
    this.translateService.use(langauge);
  }
  //add drop down list phone number
  clickSelectedOption() {
    this.select_box.nativeElement.classList.toggle('active');
    this.selected_option.nativeElement.classList.toggle('active');
  }

  selectCountry(country: any) {
    this.select_box.nativeElement.classList.remove('active');
    this.selected_option.nativeElement.classList.remove('active');
    this.flag = country.code.toLowerCase();
    this.numberCountry = country.phone;
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    localStorage.setItem('name', file.name);
    var reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result?.toString() || '';
      localStorage.setItem('file', base64String);
    };
    reader.readAsDataURL(file);
  }
  getPhoto() {
    var base64 = localStorage.getItem('file');

    var base64Parts = base64.split(',');

    var fileFormat = base64Parts[0].split(';')[1];
    var fileContent = base64Parts[1];
    var file = new File([fileContent], localStorage.getItem('name'), {
      type: fileFormat,
    });
    return file;
  }
  test!: any;
  sendMethode() {
    this.price = localStorage.getItem('price');

    this.loading = true;
    if (!this.price) {
      Swal.fire({
        icon: 'error',
        title: 'Oups !',
        text: `Veuillez sélectionner un pack. !`,
      }).then(() => {
        this.form.reset();
      });
    } else {
      this.price = this.price.split(' ');
      this.price = this.price[0];
      console.log('------------', this.price);
      if (this.form.invalid) {
        return;
      }
      const modalRef = this.modalService.open(MethodePaymentComponent, {
        size: 'lg',
        centered: true,
      });
      console.log('aaaaaaaaaaaa', this.f);

      let bodytest = {
        jsonrpc: '2.0',
        params: {
          name: 'oddo',
          partner_id: 1, // ID du partenaire
          date_order: '2023-10-25',
          pricelist_id: 2,
          company_name: this.f['Name'].value,
          name_space: this.f['NameSpace'].value,
          phone: this.f['Number'].value,
          email: this.f['Email'].value,
          matricule_fiscale: this.f['Kbis_Mf'].value,
          pays: this.f['Pays'].value,
          Url_site: this.f['UrlWebSite'].value,
          logo: 'bird_2.jpg',
          user_id: 1,
          order_lines: [JSON.parse(localStorage.getItem('package'))],
        },
      };
      modalRef.componentInstance.bodytest = bodytest;
      modalRef.componentInstance.orderId.subscribe((data: any) => {
        console.log('##################', data.type);

        if (data.type == 'paiement en ligne') {
          this.payNCreateCompany();
        } else if (data.type == 'virement bancaire') {
          console.log('in');

          this.route.navigate(['/bank-transfer', 'VB', data.orderId]);
        } else if (data.type == 'paiement par chèque') {
          this.route.navigate(['/bank-transfer', 'PC']);
        }
      });
    }
  }

  payNCreateCompany() {
    //tagtagtag
    this.price = Number(this.price);
    localStorage.setItem('form_organisation', JSON.stringify(this.form.value));
    localStorage.setItem('type', this.type.toString());
    this.payService.initPay(this.price).then((pay: any) => {
      window.open(pay.payUrl, '_self');
    });
  }
  createCompany() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const paymentRef = params['payment_ref'];
      if (paymentRef) {
        // Le paramètre "payment_ref" existe dans l'URL, vous pouvez exécuter votre code ici.
        const object = JSON.parse(localStorage.getItem('form_organisation'));
        // console.log('test object,')
        console.log('object test', object);
        const type = JSON.parse(localStorage.getItem('type'));
        const formData = new FormData();
        formData.append('Name', object.Name.replace(/ /g, '_'));
        formData.append('NameSpace', object.NameSpace);
        formData.append('Email', object.Email);
        formData.append('Number', object.Number);
        formData.append('Pays', object.Pays);
        formData.append('Kbis_Mf', object.Kbis_Mf);
        formData.append('UrlWebSite', object.UrlWebSite);
        formData.append('Logo', this.getPhoto());
        formData.append('Type', type);

        // Afficher les données formData dans la console pour le débogage

        // Continuez avec le reste de votre code ici
        const paymentData = {
          jsonrpc: '2.0',
          params: {
            payment_method_id: 2,
            payment_type: 'inbound',
            sale_order_id: 434,
            amount: 300.0,
          },
        };

        this.companyServ
          .createCompanypay(paymentData)
          .then((paymentResponse) => {
            // Afficher la réponse de l'appel à createCompanypay dans la console
            console.log('Réponse de createCompanypay :', paymentResponse);

            Swal.fire(
              'Fait!',
              `Nous avons bien reçu votre paiement. La création de votre entreprise sera faite dans les plus brefs délais. Vous serez notifié par e-mail.`,
              'success'
            );
          })
          .catch((error) => {
            console.error("Erreur lors de l'appel à createCompanypay :", error);
            // Gérer les erreurs ici
            Swal.fire(
              'Alerte!',
              `Nous avons bien reçu votre paiement, mais la création n'a pas abouti. Veuillez vérifier vos données.`,
              'warning'
            );
          });
      } else {
        // Le paramètre "payment_ref" n'existe pas dans l'URL, vous pouvez gérer cela ici.
        console.log("Le paramètre 'payment_ref' n'existe pas dans l'URL.");
        // Ajoutez ici d'autres actions en cas d'absence de "payment_ref".
      }
    });
  }

  get f() {
    return this.form.controls;
  }
}

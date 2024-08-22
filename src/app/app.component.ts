import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LMS-Project-Front';
  loading = false;
  form: FormGroup;
  form2: FormGroup;
  contactForm: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name_entreprise: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      entreprise_fiscal_id: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
      entreprise_mobile_number: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      logo_filename: [null, Validators.required],
    });

    this.form2 = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      accountant_mobile_number: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      logo_filename: file,
    });
    this.form.get('logo_filename').updateValueAndValidity();
  }

  sendEntrpriseDemand() {
    // this.loading = true;
    // const endpointUrl = `${environment.API_URL}/entrepriseDetails`;
    // const formData = new FormData();
    // formData.append('name', this.form.get('name_entreprise').value);
    // formData.append('email', this.form.get('email').value);
    // formData.append(
    //   'entreprise_fiscal_id',
    //   this.form.get('entreprise_fiscal_id').value
    // );
    // formData.append(
    //   'entreprise_mobile_number',
    //   this.form.get('entreprise_mobile_number').value
    // );
    // formData.append('logo_filename', this.form.get('logo_filename').value);
    // this.http.post(endpointUrl, formData).subscribe(
    //   (result: Response) => {
    //     this.loading = false;
    //     if (result.status != 200) {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Vous avez mal rempli la formulaire',
    //         text: `${result.body}`,
    //       });
    //     } else {
    //       Swal.fire(
    //         'Fait!',
    //         'Votre demande est bien envoyé. Nous allons vous envoyer un email avec vos identifiants.',
    //         'success'
    //       );
    //       const endpointUrl = `${environment.API_URL}/sendContactEmail`;
    //       this.http
    //         .post(endpointUrl, {
    //           name: this.form.get('name_entreprise').value,
    //           email: this.form.get('email').value,
    //           message: `une nouvelle entreprise "<b> ${
    //             this.form.get('name_entreprise').value
    //           } </b>" a demandé une démo Merci de le faire un compte sur LMS`,
    //         })
    //         .subscribe(
    //           (res: Response) => {
    //             console.log('Mail sent to the superadmin');
    //           },
    //           (error) => {
    //             if (error) {
    //               console.log(error);
    //             }
    //           }
    //         );
    //       this.form.reset();
    //     }
    //   },
    //   (err) => {
    //     if (err.status == 500) {
    //       Swal.fire(
    //         `La demande n'est pas été envoyée`,
    //         `Le logo doit être sous l'extension : .jpg / .jpeg / .png`,
    //         'warning'
    //       );
    //     } else {
    //       Swal.fire(
    //         `La demande n'est pas été envoyée`,
    //         `Cette adresse email déja existe.`,
    //         'warning'
    //       );
    //     }
    //     this.loading = !this.loading;
    //   }
    // );
  }

  sendAccountantDemand() {
    this.loading = true;
    const endpointUrl = `${environment.API_URL}/accountantDetails`;

    const accountantDemand = {
      name: this.form2.get('name').value,
      email: this.form2.get('email').value,
      accountant_mobile_number: this.form2.get('accountant_mobile_number')
        .value,
    };

    this.http.post(endpointUrl, accountantDemand).subscribe((res: Response) => {
      this.loading = false;
      if (res.status == 401) {
        Swal.fire({
          icon: 'error',
          title: 'Vous avez mal rempli la formulaire',
          text: `Cette adresse email existe déja`,
        });
      } else {
        Swal.fire(
          'Fait!',
          'Votre demande est bien envoyé. Nous allons vous envoyer un email avec vos identifiants.',
          'success'
        );
        const endpointUrl = `${environment.API_URL}/sendContactEmail`;

        this.http
          .post(endpointUrl, {
            name: this.form2.get('name').value,
            email: this.form2.get('email').value,
            message: `un nouveau comptable "<b> ${
              this.form2.get('name').value
            } </b>" a demandé un demo Merci de le faire un compte sur LMS`,
          })
          .subscribe(
            (res: Response) => {
              console.log('Mail sent to the superadmin');
              this.form2.reset();
            },
            (error) => {
              if (error) {
                console.log(error);
              }
            }
          );
      }
    });
  }
  openTermsOfUse() {
    window.open('../assets/PDF/termsOfuse.pdf', '_blank');
  }

  sendContactMail() {
    this.loading = true;
    const endpointUrl = `${environment.API_URL}/sendContactEmail`;

    const contactBody = {
      name: this.contactForm.get('name').value,
      email: this.contactForm.get('email').value,
      message: this.contactForm.get('message').value,
      phone: this.contactForm.get('phone').value,
    };

    this.http.post(endpointUrl, contactBody).subscribe(
      (res: Response) => {
        this.loading = false;
        Swal.fire('Fait!', 'Votre email est envoyé avec success', 'success');
      },
      (error) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: `opération échouée`,
            text: `l'email n'est pas été envoyé`,
          });
        }
      }
    );
  }
}

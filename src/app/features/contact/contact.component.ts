import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  loading = false;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,

  ){}

  ngOnInit(){
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
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
        this.contactForm.reset();
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

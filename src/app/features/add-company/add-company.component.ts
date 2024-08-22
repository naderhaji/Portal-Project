import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  form: FormGroup;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Tunisia, CountryISO.France];
  SearchCountryField = SearchCountryField
}

import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'country-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(private countryService: CountriesService) { }

  public searchCountries(term: string ): void {
    this.countryService.searchCountryName(term)
      .subscribe( countries => {
        this.countries = countries;
      });
  }
}

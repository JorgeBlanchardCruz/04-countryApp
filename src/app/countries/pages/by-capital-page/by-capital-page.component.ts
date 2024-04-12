import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countryService: CountriesService) { }

  public searchCountries(term: string ): void {
    this.countryService.searchCapitalName(term)
      .subscribe( countries => {
        this.countries = countries;
      });
  }
}

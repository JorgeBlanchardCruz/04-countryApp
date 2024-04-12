import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-all-page',
  templateUrl: './all-page.component.html',
  styles: ``
})
export class AllCountriesPageComponent {

  public countries: Country[] = [];

  constructor(private countryService: CountriesService) {
      this.searchCountries();
   }

  public searchCountries(): void {
    this.countryService.getAll()
      .subscribe( countries => {
        this.countries = countries;
      });
  }
}

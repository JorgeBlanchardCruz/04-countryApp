import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-all-page',
  templateUrl: './all-page.component.html',
  styles: ``
})
export class AllCountriesPageComponent implements OnInit {

  public countries: Country[] = [];

  constructor(private countryService: CountriesService) {

   }

  public ngOnInit(): void {
    this.searchCountries();
  }

  public searchCountries(): void {
    this.countryService.getAll()
      .subscribe( countries => {
        this.countries = countries;
      });
  }
}

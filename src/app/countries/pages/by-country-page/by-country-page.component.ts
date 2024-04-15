import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'country-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public initialValue: string = '';
  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) {

  }

  ngOnInit(): void {
    this.initialValue = this.countryService.cacheStore.byCountry.term;
    this.countries = this.countryService.cacheStore.byCountry.countries;
  }

  public searchCountries(term: string ): void {

    this.isLoading = true;

    this.countryService.searchCountryName(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

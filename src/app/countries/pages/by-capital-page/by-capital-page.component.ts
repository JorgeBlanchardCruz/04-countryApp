import { Component, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];

  public initialValue: string = '';

  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) {

  }

  ngOnInit(): void {
    this.initialValue = this.countryService.cacheStore.byCapital.term;
    this.countries = this.countryService.cacheStore.byCapital.countries;
  }

  public searchCountries(term: string ): void {

    this.isLoading = true;

    this.countryService.searchCapitalName(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });

  }
}

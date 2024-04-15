import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-all-page',
  templateUrl: './all-page.component.html',
  styles: ``
})
export class AllCountriesPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) {

  }

  public ngOnInit(): void {

    this.countries = this.countryService.cacheStore.all;

    if (this.countries.length === 0)
      this.searchCountries();
  }

  public searchCountries(): void {

    this.isLoading = true;

    this.countryService.getAll()
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

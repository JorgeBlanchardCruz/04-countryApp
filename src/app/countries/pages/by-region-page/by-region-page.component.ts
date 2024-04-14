import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

import { Region } from '../../interfaces/region';



@Component({
  selector: 'country-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public selectedRegion: Region | undefined = undefined;

  constructor(private countryService: CountriesService) { }

  public searchCountries(term: Region): void {

    this.isLoading = true;
    this.selectedRegion = term;

    this.countryService.searchRegionName(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  public getRegions(): Region[] {
    return this.countryService.getRegions();
  }
}

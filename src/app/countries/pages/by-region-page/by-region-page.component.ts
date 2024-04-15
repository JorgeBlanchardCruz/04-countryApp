import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'country-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public selectedRegion: Region | undefined = undefined;
  public countries: Country[] = [];

  public isLoading: boolean = false;


  constructor(private countryService: CountriesService) {

  }

  ngOnInit(): void {
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
    this.countries = this.countryService.cacheStore.byRegion.countries;
  }

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

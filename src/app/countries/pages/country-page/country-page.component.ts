import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country, Currencies, Languages } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap ( ({id}) => this.countriesService.getByAlphaCode(id))
      )
      .subscribe( country => {
        this.setCountry(country);
      });
  }

  private setCountry(country: Country | null): void {

    if (!country) {
      this.router.navigateByUrl('');
      return;
    }

    this.country = country;
  }

  getLanguageKeys(languages: Languages): string[] {
    return languages ? Object.keys(languages) : [];
  }

  getCurrencyKeys(currencies: Currencies): string[] {
    return currencies ? Object.keys(currencies) : [];
  }



}

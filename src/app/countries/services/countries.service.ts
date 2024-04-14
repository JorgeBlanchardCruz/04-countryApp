import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private urlgetAll: string = `${this.apiUrl}/all`;
  private urlbyAlpha: string = `${this.apiUrl}/alpha/`;
  private urlbyCapital: string = `${this.apiUrl}/capital/`;
  private urlbyRegion: string = `${this.apiUrl}/region/`;
  private urlbyName: string = `${this.apiUrl}/name/`;

  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        delay(1000),
        catchError( () => { return of([]) }),
      );
  }

  public getAll(): Observable<Country[]> {
    const url = this.urlgetAll;
    return this.getCountriesRequest(url);
  }

  public getByAlphaCode(alphaCode: string): Observable<Country | null> {

      const url = `${this.urlbyAlpha}${alphaCode}`;

      return this.httpClient.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => { return of(null) })
      );
    }

  public searchCapitalName(term: string): Observable<Country[]> {
    const url = `${this.urlbyCapital}${term}`;
    return this.getCountriesRequest(url);
  }

  public searchCountryName(term: string): Observable<Country[]> {
    const url = `${this.urlbyName}${term}`;
    return this.getCountriesRequest(url);
  }

  public searchRegionName(term: string): Observable<Country[]> {
    const url = `${this.urlbyRegion}${term}`;
    return this.getCountriesRequest(url);
  }

}

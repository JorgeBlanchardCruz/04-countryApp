import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private urlgetAll: string = `${this.apiUrl}/all`;
  private urlbyCapital: string = `${this.apiUrl}/capital/`;
  private urlbyRegion: string = `${this.apiUrl}/region/`;
  private urlbyName: string = `${this.apiUrl}/name/`;

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Country[]> {

    const url = this.urlgetAll;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => { return of([]) })
      );
  }

  public searchCapitalName(term: string): Observable<Country[]> {

    const url = `${this.urlbyCapital}${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => { return of([]) })
      );
  }

  public searchCountryName(term: string): Observable<Country[]> {

    const url = `${this.urlbyName}${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => { return of([]) })
      );
  }

  public searchRegionName(term: string): Observable<Country[]> {

    const url = `${this.urlbyRegion}${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => { return of([]) })
      );
  }

}

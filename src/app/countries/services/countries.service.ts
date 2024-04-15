import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';
import { CacheStore } from '../interfaces/cache-store.interface';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private urlgetAll: string = `${this.apiUrl}/all`;
  private urlbyAlpha: string = `${this.apiUrl}/alpha/`;
  private urlbyCapital: string = `${this.apiUrl}/capital/`;
  private urlbyRegion: string = `${this.apiUrl}/region/`;
  private urlbyName: string = `${this.apiUrl}/name/`;

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries:[]},
    byCountry: {term: '', countries:[]},
    byRegion:  {region: '', countries:[]}, // Added initializer for 'region' property
    all:       []
  }

  constructor(private httpClient: HttpClient) {

  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        })),
        catchError(() => { return of([]) }),
      )
  }

  public getAll(): Observable<Country[]> {
    const url = this.urlgetAll;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.all = countries)
      );
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
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term, countries})
      );
  }

  public searchCountryName(term: string): Observable<Country[]> {
    const url = `${this.urlbyName}${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountry = {term, countries})
      );
  }

  public searchRegionName(region: Region): Observable<Country[]> {
    const url = `${this.urlbyRegion}${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = {region, countries}) // Updated 'region' property
      );
  }

  public getRegions(): Region[] {
    return this.regions;
  }

}

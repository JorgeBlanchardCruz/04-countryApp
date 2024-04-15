import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';
import { CacheStore } from '../interfaces/cache-store.interface';


@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private urlgetAll: string = `${this.apiUrl}/all`;
  private urlbyAlpha: string = `${this.apiUrl}/alpha/`;
  private urlbyCapital: string = `${this.apiUrl}/capital/`;
  private urlbyRegion: string = `${this.apiUrl}/region/`;
  private urlbyName: string = `${this.apiUrl}/name/`;

  private cacheStoreKey: string = 'cacheStore';
  public cacheStore: CacheStore = {
    byCapital: {term: '', countries:[]},
    byCountry: {term: '', countries:[]},
    byRegion:  {region: '', countries:[]}, // Added initializer for 'region' property
    all:       []
  }

  private regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private savetoLocalStorage(): void {
    localStorage.setItem(this.cacheStoreKey, JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    const cacheStore = localStorage.getItem(this.cacheStoreKey);
    if (cacheStore)
      this.cacheStore = JSON.parse(cacheStore);
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
        catchError(() => { return of([]) })
      )
  }

  public getAll(): Observable<Country[]> {
    const url = this.urlgetAll;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.all = countries),
        tap( () => this.savetoLocalStorage())
      );
  }

  public getByAlphaCode(alphaCode: string): Observable<Country | null> {

      const url = `${this.urlbyAlpha}${alphaCode}`;

      return this.httpClient.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        tap( () => this.savetoLocalStorage()),
        catchError( () => { return of(null) })
      );
    }

  public searchCapitalName(term: string): Observable<Country[]> {
    const url = `${this.urlbyCapital}${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term, countries}),
        tap( () => this.savetoLocalStorage())
      );
  }

  public searchCountryName(term: string): Observable<Country[]> {
    const url = `${this.urlbyName}${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountry = {term, countries}),
        tap( () => this.savetoLocalStorage())
      );
  }

  public searchRegionName(region: Region): Observable<Country[]> {
    const url = `${this.urlbyRegion}${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = {region, countries}),
        tap( () => this.savetoLocalStorage())
      );
  }

  public getRegions(): Region[] {
    return this.regions;
  }

}

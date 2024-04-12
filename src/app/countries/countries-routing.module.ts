import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { AllCountriesPageComponent } from './pages/all-page/all-page.component';

const rountes : Route[] = [
  {
    path: 'all',
    component: AllCountriesPageComponent
  },
  {
    path: 'by-capital',
    component: ByCapitalPageComponent
  },
  {
    path: 'by-country',
    component: ByCountryPageComponent
  },
  {
    path: 'by-region',
    component: ByRegionPageComponent
  },
  {
    path: 'by/:id',
    component: CountryPageComponent
  },
  {
    path: '**',
    redirectTo: 'by-capital'
  },
]


@NgModule({
  imports: [
    RouterModule.forChild(rountes)
  ],
  exports: [
    RouterModule
  ],
})
export class CountriesRoutingModule { }

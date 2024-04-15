import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { Sort, SortDirection } from '@angular/material/sort';


@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: ``
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];

  public sortData(event: Event) {

    const sort: Sort = {
      active: (event.target as HTMLInputElement).value,
      direction: this.toSortDirection((event.target as HTMLInputElement).dataset['sortDirection'])
    };

    const data = this.countries.slice();
    if (!sort.active || sort.direction === '') {
      this.countries = data;
      return;
    }

    this.countries = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'country': return this.compare(a.name.official, b.name.official, isAsc);
        case 'capital': return this.compare(a.capital[0], b.capital[0], isAsc);
        case 'region': return this.compare(a.region, b.region, isAsc);
        default: return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private toSortDirection(value: string | undefined): SortDirection {
    switch (value) {
      case 'asc':
      case 'desc':
      case '':
        return value;
      default:
        return 'asc'; // default value
    }
  }

}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private _debouncer = new Subject<string>();
  private _debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  public ngOnInit(): void {
    this.initializeDebouncer();
  }

  public ngOnDestroy(): void {
    this._debouncerSubscription?.unsubscribe();
  }

  private initializeDebouncer(): void {
    this._debouncerSubscription = this._debouncer
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.onValue.emit(value);
      });
  }

  public onKeyPress(value: string): void {
    this._debouncer.next(value);
  }

}

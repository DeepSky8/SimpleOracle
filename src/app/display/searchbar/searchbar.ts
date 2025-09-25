import { TitleCasePipe } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  filterText: string = '';
  @Input() renavigateQuery!: (arg: string) => void;
  @Input() renavigatePathType!: () => void;
  @Input() pathType!: string;
  querySubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    this.querySubscription = this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {

      const queryEntry = params.get('filter')

      if (queryEntry) {
        this.filterText = queryEntry.toLowerCase();
      };

    })
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }

  cyclePath(): void {
    if (this.renavigatePathType) {
      this.renavigatePathType();
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value.toLowerCase() || '';
    if (this.renavigateQuery) {
      this.renavigateQuery(value);
    };

  }

  onResetClick(): void {
    this.filterText = '';

    if (this.renavigateQuery) {
      this.renavigateQuery('');
    };
  }

}

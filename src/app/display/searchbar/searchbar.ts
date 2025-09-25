import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar {
  searchText: string = '';
  @Input() renavigateQuery!: (arg: string) => void;
  @Input() renavigatePathType!: () => void;
  @Input() pathType!: string;

  constructor() { }

  cyclePath(): void {
    if (this.renavigatePathType) {
      this.renavigatePathType();
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value || '';
    if (this.renavigateQuery) {
      this.renavigateQuery(value);
    };

  }

  onResetClick(): void {
    this.searchText = '';

    if (this.renavigateQuery) {
      this.renavigateQuery('');
    };
  }

}

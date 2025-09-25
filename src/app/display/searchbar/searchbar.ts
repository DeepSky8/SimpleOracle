import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar {
  searchText: string = '';
  @Input() renavigate!: (arg: string) => void;

  constructor() { }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value || '';
    if (this.renavigate) {
      this.renavigate(value);
    };

  }

  onResetClick(): void {
    this.searchText = '';

    if (this.renavigate) {
      this.renavigate('');
    };
  }

}

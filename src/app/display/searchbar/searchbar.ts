import { Component } from '@angular/core';
import { OraclePinService } from '../../data/oracle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar {
  searchText: string = '';

  constructor(private oraclePinService: OraclePinService) {

  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value || '';
    this.oraclePinService.setSearchText(value)
  }

  onResetClick(): void {
    this.searchText = '';
    this.oraclePinService.clearSearchText();

  }

}

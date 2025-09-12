import { Component } from '@angular/core';
import { OraclePinService } from '../../data/oracle.service';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar {

  constructor(private oraclePinService: OraclePinService) { }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value || '';
    this.oraclePinService.setSearchText(value)
  }

}

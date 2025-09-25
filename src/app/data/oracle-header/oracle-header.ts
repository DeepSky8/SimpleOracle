import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-oracle-header',
  imports: [NgClass],
  templateUrl: './oracle-header.html',
  styleUrls: [
    '../../../styles/_materialIcons.scss',
    './oracle-header.scss',
    '../../../styles/_oracleDefaults.scss',
  ]
})
export class OracleHeader {
  @Input() pinned: boolean = false;
  @Input() pinThisOracle!: () => void
  @Input() title: string = '';
  @Input() pinnedLength: number = 0;
  @Input() upThisOracle!: () => void;
  @Input() downThisOracle!: () => void;

  triggerPin(): void {
    if (this.pinThisOracle) {
      this.pinThisOracle();
    }
  }

  triggerUp(): void {
    if (this.upThisOracle) {
      this.upThisOracle
    }
  }

  triggerDown(): void {
    if (this.downThisOracle) {
      this.downThisOracle
    }
  }
}

import { Component, Input } from '@angular/core';
import { IOracle } from '../../data/oracle.model';
import { OraclePinService } from '../../data/oracle.service';

@Component({
  selector: 'app-oracle',
  imports: [],
  templateUrl: './oracle.html',
  styleUrls: [
    '../../../styles/_materialIcons.scss',
    '../../../styles/_oracleDefaults.scss',
  ]
})
export class Oracle {
  @Input() oracle!: IOracle;
  @Input() pinLength!: number;
  position: number = 0;
  pinned: boolean = false;

  constructor(private oraclePinService: OraclePinService) { };

  ngOnInit() {
    this.pinned = this.oracle.pinned
  }

  generateRoll(maxRoll: number, currentRoll: number): number {
    if (maxRoll > 0) {
      const newRoll = Math.floor(Math.random() * maxRoll) + 1
      return (currentRoll === newRoll ? this.generateRoll(maxRoll, currentRoll) : newRoll)
    } else {
      return 0
    }
  }

  rollDice(parameter?: string): void { }

  pinThisOracle(): void {
    this.oraclePinService.pin(this.oracle.iID);
    this.pinned = !this.pinned;
  }

  upThisOracle(): void {
    this.oraclePinService.moveUp(this.oracle.iID)
  }

  downThisOracle(): void {
    this.oraclePinService.moveDown(this.oracle.iID)
  }

}

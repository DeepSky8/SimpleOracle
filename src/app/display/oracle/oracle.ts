import { Component, Input } from '@angular/core';
import { IOracle } from '../../data/oracle.model';


@Component({
  selector: 'app-oracle',
  imports: [],
  templateUrl: './oracle.html',
  styleUrl: './oracle.scss'
})
export class Oracle {
  @Input() oracle!: IOracle;

  ngOnInit() { }

  generateRoll(maxRoll: number, currentRoll: number): number {
    if (maxRoll > 0) {
      const newRoll = Math.floor(Math.random() * maxRoll) + 1
      return currentRoll !== newRoll ? newRoll : this.generateRoll(maxRoll, currentRoll)
    } else {
      return 0
    }
  }

  rollDice(parameter?: string): void { }


}

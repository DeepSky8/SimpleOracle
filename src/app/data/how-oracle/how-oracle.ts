import { Component } from '@angular/core';
import { Oracle } from '../../display/oracle/oracle';
import { amounts } from '../library';
import { OracleHeader } from "../oracle-header/oracle-header";

@Component({
  selector: 'app-how-oracle',
  imports: [OracleHeader],
  templateUrl: './how-oracle.html',
  styleUrls: [
    '../../../styles/_materialIcons.scss',
    './how-oracle.scss',
    '../../../styles/_oracleDefaults.scss'
  ]
})
export class HowOracle extends Oracle {
  public amounts = Object.values(amounts)
  rollPrimary: number = 0; // Regular roll
  rollSecondary: number = 0; // Secondary roll (advantage/disadvantage)

  descPrimary: string = ''
  descSecondary: string = ''
  descReminder: string = ''

  override ngOnInit() {
    super.ngOnInit()
    this.descPrimary = this.oracle.table[0][0][0]
    this.descSecondary = this.oracle.table[0][0][1]
    this.descReminder = this.oracle.table[0][0][2]
  }

  override rollDice(likelihood: string): void {

    const tempRollOne = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.rollPrimary)
    const tempRollTwo = this.generateRoll(this.oracle.rollCaps.rollTwoMax, this.rollSecondary)
    const sortedRolls = [tempRollOne, tempRollTwo].sort()

    this.rollPrimary = 0
    this.rollSecondary = 0

    switch (likelihood) {
      case amounts.average: {
        this.rollPrimary = tempRollOne;
        this.descPrimary = this.oracle.table[0][tempRollOne][0]
        this.descSecondary = this.oracle.table[0][tempRollOne][1]
        this.descReminder = this.oracle.table[0][tempRollOne][2]

        break;
      }
      case amounts.more: {
        const tempPrimary = sortedRolls[1]
        const tempSecondary = sortedRolls[0]

        this.rollPrimary = tempPrimary
        this.rollSecondary = tempSecondary

        this.descPrimary = this.oracle.table[0][tempPrimary][0]
        this.descSecondary = this.oracle.table[0][tempPrimary][1]
        this.descReminder = this.oracle.table[0][tempPrimary][2]

        break;
      }

      case amounts.fewer: {
        const tempPrimary = sortedRolls[0]
        const tempSecondary = sortedRolls[1]

        this.rollPrimary = tempPrimary
        this.rollSecondary = tempSecondary

        this.descPrimary = this.oracle.table[0][tempPrimary][0]
        this.descSecondary = this.oracle.table[0][tempPrimary][1]
        this.descReminder = this.oracle.table[0][tempPrimary][2]

        break;
      }

      default: {

        break;
      }
    }
  }
}

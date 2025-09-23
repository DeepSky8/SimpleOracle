import { Component } from '@angular/core';
import { Oracle } from '../../display/oracle/oracle';
import { odds } from '../library';
import { OracleHeader } from "../oracle-header/oracle-header";

@Component({
  selector: 'app-cascading-oracle',
  imports: [OracleHeader],
  templateUrl: './cascading-oracle.html',
  styleUrls: [
    '../../../styles/_materialIcons.scss',
    './cascading-oracle.scss',
    '../../../styles/_oracleDefaults.scss'
  ]

})
export class CascadingOracle extends Oracle {
  public odds = Object.entries(odds);
  rollPrimary: number = 0; // Regular roll
  rollSecondary: number = 0; // Secondary roll (advantage/disadvantage)
  currentStep: number = 0

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


    const tempRollOne = this.generateRoll(this.oracle.rollCaps.rollOneMax, 0)
    const tempRollTwo = this.generateRoll(this.oracle.rollCaps.rollOneMax, 0)
    const sortedRolls = [tempRollOne, tempRollTwo].sort()

    this.rollPrimary = 0
    this.rollSecondary = 0

    switch (likelihood) {
      case odds.average: {
        this.rollPrimary = tempRollOne;
        this.descPrimary = this.oracle.table[this.currentStep][tempRollOne][0]
        this.descSecondary = this.oracle.table[this.currentStep][tempRollOne][1]
        this.descReminder = this.oracle.table[this.currentStep][tempRollOne][2]
        break;
      }
      case odds.likely: {
        const tempPrimary = sortedRolls[1]
        const tempSecondary = sortedRolls[0]

        this.rollPrimary = tempPrimary
        this.rollSecondary = tempSecondary

        this.descPrimary = this.oracle.table[this.currentStep][tempPrimary][0]
        this.descSecondary = this.oracle.table[this.currentStep][tempPrimary][1]
        this.descReminder = this.oracle.table[this.currentStep][tempPrimary][2]
        break;
      }

      case odds.unlikely: {
        const tempPrimary = sortedRolls[0]
        const tempSecondary = sortedRolls[1]

        this.rollPrimary = tempPrimary
        this.rollSecondary = tempSecondary

        this.descPrimary = this.oracle.table[this.currentStep][tempPrimary][0]
        this.descSecondary = this.oracle.table[this.currentStep][tempPrimary][1]
        this.descReminder = this.oracle.table[this.currentStep][tempPrimary][2]
        break;
      }

      default: {

        break;
      }
    }

    if (this.currentStep < 2) {
      this.currentStep++
    } else {
      this.currentStep = 0
    }
  }

  onClickReset(): void {
    this.currentStep = 0;
    this.rollPrimary = 0;
    this.rollSecondary = 0
    this.descPrimary = this.oracle.table[0][0][0]
    this.descSecondary = this.oracle.table[0][0][1]
    this.descReminder = this.oracle.table[0][0][2]
  }
}

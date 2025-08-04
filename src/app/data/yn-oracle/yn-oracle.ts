import { Component } from '@angular/core';
import { Oracle } from '../../display/oracle/oracle';
import { CommonModule } from '@angular/common';
import { odds } from '../odds';

@Component({
  selector: 'app-yn-oracle',
  imports: [CommonModule],
  templateUrl: './yn-oracle.html',
  styleUrls: [
    './yn-oracle.scss',
    '../../../styles/_oracleDefaults.scss'
  ]
})
export class YnOracle extends Oracle {
  public odds = Object.entries(odds);
  rollPrimary: number = 0; // Regular roll
  rollSecondary: number = 0; // Secondary roll (advantage/disadvantage)
  rollTwistCap: number = 0; // Current Twist Die cap

  descPrimary: string = ''
  descSecondary: string = ''
  descReminder: string = ''

  twistSubject: string = ''
  twistAction: string = ''

  override ngOnInit() {

    this.descPrimary = this.oracle.table[0][0][0]
    this.descSecondary = this.oracle.table[0][0][1]
    this.descReminder = this.oracle.table[0][0][2]
    this.rollTwistCap = this.oracle.rollCaps.rollThreeMax;
  }

  newTwistDieCap(currentRoll: number, currentTwistDie: number): number {
    // Twist die starts at 4
    const twistRoll = this.generateRoll(currentTwistDie, 0)

    // Only invoke the twist die on a currentRoll of 1 or 6
    // AND if the twist roll is 1
    if ((currentRoll === 1 || currentRoll === 6) && twistRoll === 1) {
      // If the current twist die is capped at 2, we've triggered a twist
      if (currentTwistDie === 2) {
        return 4
      } else {
        // else decrement the twist cap
        return currentTwistDie - 1
      }
    } else {
      // Most of the time the twist die doesn't decrement
      return currentTwistDie
    }
  }



  override rollDice(likelihood: string): void {
    this.twistSubject = ''
    this.twistAction = ''
    const tempRollOne = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.rollPrimary)
    const tempRollTwo = this.generateRoll(this.oracle.rollCaps.rollTwoMax, this.rollSecondary)
    this.rollPrimary = 0
    this.rollSecondary = 0

    switch (likelihood) {
      case odds.average: {
        this.rollPrimary = tempRollOne;
        this.descPrimary = this.oracle.table[0][tempRollOne][0]
        this.descSecondary = this.oracle.table[0][tempRollOne][1]
        this.descReminder = this.oracle.table[0][tempRollOne][2]

        this.evaluateTwist(tempRollOne)
        break;
      }
      case odds.likely: {
        const sortedRolls = [tempRollOne, tempRollTwo].sort()
        const tempPrimary = sortedRolls[1]
        const tempSecondary = sortedRolls[0]

        this.rollPrimary = tempPrimary
        this.rollSecondary = tempSecondary

        this.descPrimary = this.oracle.table[0][tempPrimary][0]
        this.descSecondary = this.oracle.table[0][tempPrimary][1]
        this.descReminder = this.oracle.table[0][tempPrimary][2]

        this.evaluateTwist(tempPrimary)
        break;
      }

      case odds.unlikely: {
        const sortedRolls = [tempRollOne, tempRollTwo].sort()
        const tempPrimary = sortedRolls[0]
        const tempSecondary = sortedRolls[1]

        this.rollPrimary = tempPrimary
        this.rollSecondary = tempSecondary

        this.descPrimary = this.oracle.table[0][tempSecondary][0]
        this.descSecondary = this.oracle.table[0][tempSecondary][1]
        this.descReminder = this.oracle.table[0][tempSecondary][2]

        this.evaluateTwist(tempSecondary)
        break;
      }

      default: {

        break;
      }
    }
  }

  evaluateTwist(currentRoll: number): void {
    const tempRollThree = this.newTwistDieCap(currentRoll, this.rollTwistCap);
    const triggeredTwist = tempRollThree === 4 && this.rollTwistCap === 2;
    this.rollTwistCap = tempRollThree;

    if (triggeredTwist) {
      this.rollTwistDie()
    }
  }

  rollTwistDie(): void {
    const tempRollFour = this.generateRoll(this.oracle.rollCaps.rollFourMax, 0)
    this.twistSubject = this.oracle.table[1][tempRollFour][0]

    const tempRollFive = this.generateRoll(this.oracle.rollCaps.rollFiveMax, 0)
    const helpHinderActionDesc = [3, 5, 6].includes(this.rollPrimary) ? 1 : 0
    this.twistAction = this.oracle.table[2][tempRollFive][helpHinderActionDesc]
  }


}

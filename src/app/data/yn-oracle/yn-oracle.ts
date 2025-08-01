import { Component } from '@angular/core';
import { Oracle } from '../../display/oracle/oracle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-yn-oracle',
  imports: [CommonModule],
  templateUrl: './yn-oracle.html',
  styleUrls: [
    './yn-oracle.scss',
    '../../../styles/_oracleButton.scss'
  ]
})
export class YnOracle extends Oracle {
  rollPrimary: number = 0; // Regular roll
  rollSecondary: number = 0; // Secondary roll (advantage/disadvantage)
  rollTwistCap: number = 0; // Current Twist Die cap
  // rollTwistSubject: number = 0; // 
  // rollTwistAction: number = 0; // 
  likely: string = '';
  // textObject: IEntry = {
  //   textOne: "",
  //   textTwo: "",
  //   textThree: "",
  //   textFour: "",
  //   textFive: "",
  //   textSix: "",
  // };

  descPrimary: string = ''
  descSecondary: string = ''
  descReminder: string = ''

  twistSubject: string = ''
  twistAction: string = ''



  override ngOnInit() {
    if (this.oracle.useLikely) {
      this.likely = this.oracle.howLikely
    };
    // this.textObject = this.oracle.table[0][0];
    this.descPrimary = this.oracle.table[0][0][0]
    this.descSecondary = this.oracle.table[0][0][1]
    this.descReminder = this.oracle.table[0][0][2]
    this.rollTwistCap = this.oracle.rollCaps.rollThreeMax;
  }

  override setLikely() { }

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

  override rollDice() {
    this.twistSubject = ''
    this.twistAction = ''

    const tempRollOne = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.rollPrimary)
    this.rollPrimary = tempRollOne;
    this.descPrimary = this.oracle.table[0][tempRollOne][0]
    this.descSecondary = this.oracle.table[0][tempRollOne][1]
    this.descReminder = this.oracle.table[0][tempRollOne][2]

    const tempRollTwo = this.generateRoll(this.oracle.rollCaps.rollTwoMax, this.rollSecondary)
    this.rollSecondary = tempRollTwo;

    // evaluate whether the twist die is decremented,
    const tempRollThree = this.newTwistDieCap(tempRollOne, this.rollTwistCap);
    const triggeredTwist = tempRollThree === 4 && this.rollTwistCap === 2;
    this.rollTwistCap = tempRollThree;

    // if the twist triggers, 
    // do something

    if (triggeredTwist) {
      this.rollTwistDie()
    }

  }

  rollTwistDie() {
    const tempRollFour = this.generateRoll(this.oracle.rollCaps.rollFourMax, 0)
    this.twistSubject = this.oracle.table[1][tempRollFour][0]
    const tempRollFive = this.generateRoll(this.oracle.rollCaps.rollFiveMax, 0)
    this.twistAction = this.oracle.table[2][tempRollFive][0]
  }


}

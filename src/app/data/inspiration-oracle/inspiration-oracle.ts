import { Component } from '@angular/core';
import { Oracle } from '../../display/oracle/oracle';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-inspiration-oracle',
  imports: [CommonModule, NgClass],
  templateUrl: './inspiration-oracle.html',
  styleUrls: [
    '../../../styles/_materialIcons.scss',
    './inspiration-oracle.scss',
    '../../../styles/_oracleDefaults.scss'
  ]
})
export class InspirationOracle extends Oracle {
  rollPrimary: number = 0; // Regular roll
  rollSecondary: number = 0; // Secondary roll (advantage/disadvantage)

  descPrimary: string = ''
  descSecondary: string = ''
  descReminder: string = ''

  descVerbRoll1: number = 0
  descVerbRoll2: number = 0
  descVerb: string = ''

  descNounRoll1: number = 0
  descNounRoll2: number = 0
  descNoun: string = ''

  descAdjectiveRoll1: number = 0
  descAdjectiveRoll2: number = 0
  descAdjective: string = ''

  override ngOnInit() {
    super.ngOnInit()
    this.descPrimary = this.oracle.table[0][0][0]
    this.descSecondary = this.oracle.table[0][0][1]
    this.descReminder = this.oracle.table[0][0][2]
  }

  override rollDice(parameter?: string): void {
    this.descPrimary = ''
    this.descSecondary = ''
    this.descReminder = ''


    const tempRollOne = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.descVerbRoll1)
    const tempRollTwo = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.descVerbRoll2)
    this.descVerbRoll1 = tempRollOne
    this.descVerbRoll2 = tempRollTwo
    this.descVerb = this.oracle.table[1][tempRollOne][tempRollTwo]


    const tempRollThree = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.descNounRoll1)
    const tempRollFour = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.descNounRoll2)
    this.descNounRoll1 = tempRollThree
    this.descNounRoll2 = tempRollFour
    this.descNoun = this.oracle.table[2][tempRollThree][tempRollFour]


    const tempRollFive = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.descAdjectiveRoll1)
    const tempRollSix = this.generateRoll(this.oracle.rollCaps.rollOneMax, this.descAdjectiveRoll2)
    this.descAdjectiveRoll1 = tempRollFive
    this.descAdjectiveRoll2 = tempRollSix
    this.descAdjective = this.oracle.table[3][tempRollFive][tempRollSix]
  }
}

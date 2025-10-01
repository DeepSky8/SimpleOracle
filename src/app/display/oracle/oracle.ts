import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { IOracle } from '../../data/oracle.model';
import { OraclePinService } from '../../data/oracle.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-oracle',
  imports: [],
  templateUrl: './oracle.html',
  styleUrls: [
    '../../../styles/_materialIcons.scss',
    '../../../styles/_oracleDefaults.scss',
  ]
})
export class Oracle implements OnInit, OnDestroy {
  readonly router = inject(Router)
  readonly activatedRoute = inject(ActivatedRoute)
  private querySubscription: Subscription | undefined;
  @Input() oracle!: IOracle;
  @Input() renavigate!: (arg: number[]) => void;
  pinnedArray: number[] = [];
  pinned: boolean = false;
  filterText: string = '';

  constructor(private oraclePinService: OraclePinService) {
    this.pinThisOracle = this.pinThisOracle.bind(this)
    this.upThisOracle = this.upThisOracle.bind(this)
    this.downThisOracle = this.downThisOracle.bind(this)
  };

  ngOnInit() {
    this.oraclePinService.getPinnedOracles().subscribe((pinnedOracles: number[]) => {
      this.pinnedArray = pinnedOracles
      this.pinned = pinnedOracles.includes(this.oracle.iID);
    });


    this.querySubscription = this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {

      const queryEntry = params.get('filter')

      if (queryEntry) {
        this.filterText = queryEntry;
      } else {
        this.filterText = '';
      };

    })
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
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
    const updatedPins: number[] = this.pinned ?
      this.pinnedArray.filter(pinnedID => pinnedID !== this.oracle.iID) :
      this.pinnedArray.length > 0 ?
        this.pinnedArray.concat(this.oracle.iID) :
        [this.oracle.iID];

    this.oraclePinService.setPinnedOracles(updatedPins);

    if (this.renavigate) {
      this.renavigate(updatedPins);
    }
  }

  upThisOracle(): void {
    let updatedPins: number[];

    const targetIndex = this.pinnedArray.findIndex(oracleID => this.oracle.iID === oracleID)
    const targetItem = this.pinnedArray.slice(targetIndex, targetIndex + 1)
    if (targetIndex > 0) {
      updatedPins = this.pinnedArray
        .toSpliced(targetIndex, 1)
        .toSpliced(targetIndex - 1, 0, targetItem[0])
    } else {
      updatedPins = this.pinnedArray
        .toSpliced(targetIndex, 1)
        .toSpliced(this.pinnedArray.length - 1, 0, targetItem[0])
    }

    if (this.renavigate) {
      this.renavigate(updatedPins);
    }

  }

  downThisOracle(): void {
    let updatedPins: number[];

    const targetIndex = this.pinnedArray.findIndex(oracleID => this.oracle.iID === oracleID)
    const targetItem = this.pinnedArray.slice(targetIndex, targetIndex + 1)
    if (targetIndex < this.pinnedArray.length - 1) {
      updatedPins = this.pinnedArray
        .toSpliced(targetIndex + 2, 0, targetItem[0])
        .toSpliced(targetIndex, 1)

    } else {
      updatedPins = this.pinnedArray
        .toSpliced(targetIndex, 1)
        .toSpliced(0, 0, targetItem[0])

    }

    if (this.renavigate) {
      this.renavigate(updatedPins);
    }

  }

}

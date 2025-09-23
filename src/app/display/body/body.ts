import { Component, inject, Input, OnInit } from '@angular/core';
import { IOracle, oracleType } from '../../data/oracle.model';
import { YnOracle } from '../../data/yn-oracle/yn-oracle';
import { Oracle } from '../oracle/oracle';
import { NgComponentOutlet } from '@angular/common';
import { HowOracle } from '../../data/how-oracle/how-oracle';
import { InspirationOracle } from '../../data/inspiration-oracle/inspiration-oracle';
import { OraclePinService } from '../../data/oracle.service';
import { Searchbar } from "../searchbar/searchbar";
import { CascadingOracle } from '../../data/cascading-oracle/cascading-oracle';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-body',
  imports: [NgComponentOutlet, Searchbar],
  templateUrl: './body.html',
  styleUrl: './body.scss'
})
export class Body implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute)
  oracles: IOracle[] = [];
  pinnedLength: number = 0;

  constructor(private oraclePinService: OraclePinService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {

      const matrixPinned = params.get('pinned');

      const pinnedValue: number[] = matrixPinned ?
        matrixPinned.split(',').map(entry => parseInt(entry)) :
        [];

      this.oraclePinService.setPinnedOracles(pinnedValue);

      this.pinnedLength = pinnedValue.length;
    });

    this.oraclePinService.filteredOracles$.subscribe(
      (oracles) => (this.oracles = oracles)
    );
  }

  componentSelector(oracle: IOracle): typeof Oracle {
    switch (oracle!.type) {
      case oracleType.yesNo: {
        return YnOracle
      }
      case oracleType.singleroll: {
        return HowOracle
      }
      case oracleType.multiroll: {
        return InspirationOracle
      }
      case oracleType.cascading: {
        return CascadingOracle
      }
      default: {
        return YnOracle
      }
    }
  }
}

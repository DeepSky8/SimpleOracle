import { Component } from '@angular/core';
import { IOracle, oracleType } from '../../data/oracle.model';
import { YnOracle } from '../../data/yn-oracle/yn-oracle';
import { Oracle } from '../oracle/oracle';
import { NgComponentOutlet } from '@angular/common';
import { HowOracle } from '../../data/how-oracle/how-oracle';
import { InspirationOracle } from '../../data/inspiration-oracle/inspiration-oracle';
import { OraclePinService } from '../../data/oracle.service';
import { Searchbar } from "../searchbar/searchbar";

@Component({
  selector: 'app-body',
  imports: [NgComponentOutlet, Searchbar],
  templateUrl: './body.html',
  styleUrl: './body.scss'
})
export class Body {
  oracles: IOracle[] = [];
  pinLength: number = 0;

  constructor(private oraclePinService: OraclePinService) { }

  ngOnInit(): void {
    this.oraclePinService.getOracles().subscribe({
      next: (oracles) => (this.oracles = oracles)
    })
    this.oraclePinService.getPinnedLength().subscribe({
      next: (length) => (this.pinLength = length)
    })
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
      default: {
        return YnOracle
      }
    }
  }
}

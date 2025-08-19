import { Component } from '@angular/core';
import { IOracle, oracleType } from '../../data/oracle.model';
import { oracles } from '../../data/oracles';
import { YnOracle } from '../../data/yn-oracle/yn-oracle';
import { Oracle } from '../oracle/oracle';
import { NgComponentOutlet } from '@angular/common';
import { HowOracle } from '../../data/how-oracle/how-oracle';
import { InspirationOracle } from '../../data/inspiration-oracle/inspiration-oracle';

@Component({
  selector: 'app-body',
  imports: [NgComponentOutlet],
  templateUrl: './body.html',
  styleUrl: './body.scss'
})
export class Body {
  oracles: IOracle[];

  constructor() {
    this.oracles = oracles
  }

  componentSelector(oracle: IOracle): typeof Oracle {
    switch (oracle!.type) {
      case oracleType.yesNo: {
        return YnOracle
      }
      case oracleType.magnitude: {
        return HowOracle
      }
      case oracleType.inspiration: {
        return InspirationOracle
      }
      default: {
        return YnOracle
      }
    }
  }

}

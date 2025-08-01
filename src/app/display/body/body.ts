import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IOracle, oracleType } from '../../data/oracle.model';
import { oracles } from '../../data/oracles';
import { YnOracle } from '../../data/yn-oracle/yn-oracle';
import { Oracle } from '../oracle/oracle';

@Component({
  selector: 'app-body',
  imports: [CommonModule],
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
      default: {
        return YnOracle
      }
    }
  }

}

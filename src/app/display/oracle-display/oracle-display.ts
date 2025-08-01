import { Component } from '@angular/core';
import { IOracle, oracleType } from '../../data/oracle.model';
import { Oracle } from '../oracle/oracle';
import { YnOracle } from '../../data/yn-oracle/yn-oracle';

@Component({
  selector: 'app-oracle-display',
  imports: [],
  templateUrl: './oracle-display.html',
  styleUrl: './oracle-display.scss'
})
export class OracleDisplay {


  // componentSelector(oracle: IOracle): Oracle {
  //   switch (oracle!.type) {
  //     case oracleType.yesNo: {
  //       return new YnOracle
  //     }
  //     default: {
  //       return new YnOracle
  //     }
  //   }
  // }

}

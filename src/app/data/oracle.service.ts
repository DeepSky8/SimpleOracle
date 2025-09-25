import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { IOracle } from './oracle.model';
import { oracles } from './oracles';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class OraclePinService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly oracles$ = of(oracles);
  private readonly filterText = this.activatedRoute.queryParamMap.pipe(
    map((params) => params.get('filter'))
  );

  private readonly oracleCategory = new BehaviorSubject<string>(ROUTER_TOKENS.SIMPLE);
  private readonly oracleCategory$ = this.oracleCategory.asObservable();

  private readonly pinnedArray = new BehaviorSubject<number[]>([]);
  private readonly pinnedArray$ = this.pinnedArray.asObservable();

  readonly filteredOracles$: Observable<IOracle[]> = this.pinnedArray$.pipe(
    switchMap((pinnedArray) =>
      this.filterText.pipe(
        switchMap((filterText) =>
          this.oracles$.pipe(
            switchMap((oracles) =>
              this.oracleCategory$.pipe(
                map((type) => {
                  const { typeFiltered, arrayFiltered } = this.filterOraclesAndArray(oracles, type, pinnedArray)

                  if (filterText) {
                    return this.sortOracles(this.applyTextFilter(typeFiltered, filterText), arrayFiltered);
                  } else {
                    return this.sortOracles(typeFiltered, arrayFiltered);
                  }
                })
              )
            )
          )
        )
      )
    )
  );

  constructor() { }

  setOracleCategory(category: string): void {
    this.oracleCategory.next(category)
  }

  getOracleCategory(): Observable<string> {
    return this.oracleCategory$
  }

  setPinnedOracles(pinnedArray: number[]): void {
    if (pinnedArray.length > 0) {
      localStorage.setItem('pinnedOracles', JSON.stringify(pinnedArray))
    } else {
      localStorage.removeItem('pinnedOracles')
    }
    this.pinnedArray.next(pinnedArray);
  }

  getPinnedOracles(): Observable<number[]> {
    return this.pinnedArray$;
  }

  private filterOraclesAndArray(oracles: IOracle[], type: string, array: number[]): { typeFiltered: IOracle[], arrayFiltered: number[] } {

    let typeFiltered: IOracle[]

    if (type === ROUTER_TOKENS.ALL) {
      typeFiltered = oracles
    } else {
      typeFiltered = oracles.filter((oracle: IOracle) => oracle.tags.includes(type.toLowerCase()));
    }
    const filteredOracleIDs = typeFiltered.map(oracle => oracle.iID)
    const arrayFiltered: number[] = array.filter(oracleID => filteredOracleIDs.includes(oracleID))

    return { typeFiltered, arrayFiltered }
  };

  private sortOracles(oracles: IOracle[], pinnedArray: number[]): IOracle[] {
    const unpinnedSorted: IOracle[] = oracles
      .filter(oracle => !pinnedArray.includes(oracle.iID))
      .sort((a, b) => {
        return (a.title).localeCompare(b.title, 'en-US')
      })

    const pinnedSorted: IOracle[] = oracles
      .filter(oracle => pinnedArray.includes(oracle.iID))
      .sort((a: IOracle, b: IOracle) => {
        const aIndex = pinnedArray.indexOf(a.iID);
        const bIndex = pinnedArray.indexOf(b.iID);
        return aIndex - bIndex
      })

    // this.pinnedLength.next(pinnedSorted.length)

    // return this.setCurrentPositionToIndex(pinnedSorted.concat(unpinnedSorted))
    return pinnedSorted.concat(unpinnedSorted)
  }

  private applyTextFilter(oracles: IOracle[], searchText: string): IOracle[] {
    if (searchText.length === 0) {
      return oracles
    } else {
      return oracles.filter(oracle => {
        const inTitle = oracle.title.toLowerCase().includes(searchText)
        const inTags = oracle.tags.filter(tag => tag.toLowerCase().includes(searchText)).length > 0
        return (inTitle || inTags)
      })

    }
  }

}

import { inject, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { IOracle } from './oracle.model';
import { oracles } from './oracles';
// import { storageToken } from './library';
import { ActivatedRoute } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class OraclePinService {
  private readonly activatedRoute = inject(ActivatedRoute)
  readonly oracles$ = of(oracles);
  private pinnedLength: number = 0;
  private readonly filterText = this.activatedRoute.queryParamMap.pipe(
    map((params) => params.get('filter'))
  )


  private readonly oracleCategory = new BehaviorSubject<string>(ROUTER_TOKENS.SIMPLE);
  private readonly oracleCategory$ = this.oracleCategory.asObservable();

  private readonly pinnedArray = new BehaviorSubject<number[]>([]);
  private readonly pinnedArray$ = this.pinnedArray.asObservable();


  constructor(
    // @Inject(storageToken) private readonly storageLocation: string,
  ) {
    // const retrieved = this.checkLocalStore(storageLocation)
    // if (retrieved) {

    //   // const unpacked: IOracle[] = this.sortOracles(JSON.parse(retrieved));
    //   const unpacked: IOracle[] = JSON.parse(retrieved);

    //   // Compare each stored oracle by iID 
    //   const compared: IOracle[] = unpacked.map(localCopy => {
    //     const officialCopy = oracles.find(oCopy => oCopy.iID === localCopy.iID)
    //     if (officialCopy) {
    //       const matchTitle = officialCopy.title === localCopy.title
    //       const matchType = officialCopy.type === localCopy.type
    //       const matchTable = officialCopy.table === localCopy.table
    //       const matchRollCaps = officialCopy.rollCaps === localCopy.rollCaps

    //       if (matchTitle && matchType && matchTable && matchRollCaps) {
    //         return localCopy
    //       } else {
    //         return { ...officialCopy, currentPosition: localCopy.currentPosition, pinned: localCopy.pinned }
    //       }

    //     } else {
    //       return localCopy
    //     }
    //   })

    //   const sorted = this.sortOracles(compared)
    //   this.oracleOrder.next(sorted);
    //   this.oracleAll = sorted;
    //   const pinnedOnlyLength = compared.filter(oracle => oracle.pinned).length
    //   this.pinnedLength.next(pinnedOnlyLength)

    // } else {
    //   this.oracleOrder.next(oracles);
    //   this.oracleAll = oracles;
    // }
  }

  setOracleCategory(category: string): void {
    this.oracleCategory.next(category)
  }

  getOracleCategory(): Observable<string> {
    return this.oracleCategory$
  }

  setPinnedOracles(pinnedArray: number[]): void {
    this.pinnedArray.next(pinnedArray);
    this.pinnedLength = pinnedArray.length;
  }

  getPinnedOracles(): Observable<number[]> {
    return this.pinnedArray$;
  }

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

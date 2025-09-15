import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOracle } from './oracle.model';
import { oracles } from './oracles';
import { storageToken } from './library';

@Injectable({
  providedIn: 'root'
})
export class OraclePinService {
  private oracleOrder: BehaviorSubject<IOracle[]> = new BehaviorSubject<IOracle[]>([]);
  private oracleAll: IOracle[];
  private pinnedLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private searchText: string = '';

  constructor(
    @Inject(storageToken) private readonly storageLocation: string,
  ) {
    const retrieved = this.checkLocalStore(storageLocation)
    if (retrieved) {

      // const unpacked: IOracle[] = this.sortOracles(JSON.parse(retrieved));
      const unpacked: IOracle[] = JSON.parse(retrieved);

      // Compare each stored oracle by iID 
      const compared: IOracle[] = unpacked.map(localCopy => {
        const officialCopy = oracles.find(oCopy => oCopy.iID === localCopy.iID)
        if (officialCopy) {
          const matchTitle = officialCopy.title === localCopy.title
          const matchType = officialCopy.type === localCopy.type
          const matchTable = officialCopy.table === localCopy.table
          const matchRollCaps = officialCopy.rollCaps === localCopy.rollCaps

          if (matchTitle && matchType && matchTable && matchRollCaps) {
            return localCopy
          } else {
            return { ...officialCopy, currentPosition: localCopy.currentPosition, pinned: localCopy.pinned }
          }

        } else {
          return localCopy
        }
      })

      const sorted = this.sortOracles(compared)
      this.oracleOrder.next(sorted);
      this.oracleAll = sorted;
      const pinnedOnlyLength = compared.filter(oracle => oracle.pinned).length
      this.pinnedLength.next(pinnedOnlyLength)

    } else {
      this.oracleOrder.next(oracles);
      this.oracleAll = oracles;
    }
  }

  private storeLocally(oracleState: IOracle[], key: string): void {
    const packed = JSON.stringify(oracleState)
    localStorage.setItem(key, packed)
  }

  private checkLocalStore(localStorageKey: string): string | null {
    return localStorage.getItem(localStorageKey)
  }

  private pushOracles(oracles: IOracle[], localStorageKey: string, searchText: string): void {

    this.oracleOrder.next(this.applyTextFilter(oracles, searchText))
    this.storeLocally(oracles, localStorageKey)

  }

  getOracles(): Observable<IOracle[]> {
    return this.oracleOrder.asObservable();
  }

  setSearchText(text: string): void {
    const trimmed = text.toLowerCase().trim()
    this.searchText = trimmed;
    this.pushOracles(this.oracleAll, this.storageLocation, trimmed)
  }

  getPinnedLength(): Observable<number> {
    return this.pinnedLength.asObservable();
  }

  getPinnedStatus(oracleID: number): boolean {
    let foundOracle = this.oracleOrder.getValue().find(oracle => oracle.iID === oracleID)
    if (foundOracle) {
      return foundOracle.pinned
    } else {
      return false
    }

  }

  private setPinStatus(oracleID: number): IOracle[] {
    let currentOrder = this.oracleAll;
    let result: IOracle[] = [];

    let foundOracle = currentOrder.find(oracle => oracle.iID === oracleID)
    if (foundOracle) {
      foundOracle.pinned = !foundOracle.pinned;
      const remainingOracles = currentOrder.filter(oracle => oracle.iID !== oracleID)
      const reorderedAllOracles = this.setCurrentPositionToIndex(this.sortOracles(remainingOracles.concat(foundOracle)))
      result = this.applyTextFilter(reorderedAllOracles, this.searchText)

    }
    return result
  }

  pin(oracleID: number): void {
    this.pushOracles(this.setPinStatus(oracleID), this.storageLocation, this.searchText)
  }



  private setCurrentPositionToIndex(oracles: IOracle[]): IOracle[] {
    return oracles.map((oracle, i) => ({ ...oracle, currentPosition: i }))
  }

  private moveOracleUp(oracleID: number, oracles: IOracle[]): IOracle[] {

    let pinned = oracles.filter(({ pinned }) => pinned)
    let unpinned = oracles.filter(({ pinned }) => !pinned)
    let result: IOracle[];

    const targetIndex = pinned.findIndex(item => item.iID === oracleID)
    const targetItem = pinned.slice(targetIndex, targetIndex + 1)
    if (targetIndex > 0) {
      result = pinned
        .toSpliced(targetIndex, 1)
        .toSpliced(targetIndex - 1, 0, targetItem[0])
        .concat(unpinned)
    } else {
      result = pinned
        .toSpliced(targetIndex, 1)
        .toSpliced(pinned.length - 1, 0, targetItem[0])
        .concat(unpinned)
    }

    return this.setCurrentPositionToIndex(result)

  }

  moveUp(oracleID: number): void {
    const result = this.moveOracleUp(oracleID, this.oracleAll)

    this.oracleAll = result
    this.pushOracles(result, this.storageLocation, this.searchText)
  }

  private moveOracleDown(oracleID: number, oracles: IOracle[]): IOracle[] {
    let pinned = oracles.filter(({ pinned }) => pinned)
    let unpinned = oracles.filter(({ pinned }) => !pinned)
    let result: IOracle[];

    const targetIndex = pinned.findIndex(item => item.iID === oracleID)
    const targetItem = pinned.slice(targetIndex, targetIndex + 1)
    if (targetIndex < pinned.length - 1) {
      result = pinned
        .toSpliced(targetIndex + 2, 0, targetItem[0])
        .toSpliced(targetIndex, 1)
        .concat(unpinned)
    } else {
      result = pinned
        .toSpliced(targetIndex, 1)
        .toSpliced(0, 0, targetItem[0])
        .concat(unpinned)
    }
    return this.setCurrentPositionToIndex(result)

  }

  moveDown(oracleID: number): void {
    const result = this.moveOracleDown(oracleID, this.oracleAll)

    this.oracleAll = result
    this.pushOracles(result, this.storageLocation, this.searchText)

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

  private sortOracles(oracles: IOracle[]): IOracle[] {
    const unpinnedSorted: IOracle[] = oracles
      .filter(oracle => !oracle.pinned)
      .sort((a, b) => {
        return (a.title).localeCompare(b.title, 'en-US')
      })

    const pinnedSorted: IOracle[] = oracles
      .filter(oracle => oracle.pinned)
      .sort((a, b) => { return a.currentPosition - b.currentPosition })

    this.pinnedLength.next(pinnedSorted.length)

    return this.setCurrentPositionToIndex(pinnedSorted.concat(unpinnedSorted))
  }
}

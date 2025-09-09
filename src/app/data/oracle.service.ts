import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOracle } from './oracle.model';
import { oracles } from './oracles';
import { storageToken } from './library';

@Injectable({
  providedIn: 'root'
})
export class OraclePinService {
  private oracleOrder: BehaviorSubject<IOracle[]> = new BehaviorSubject<IOracle[]>(
    []
  );
  private pinnedLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);


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

      this.oracleOrder.next(this.sortOracles(compared));
      const pinnedOnlyLength = compared.filter(oracle => oracle.pinned).length
      this.pinnedLength.next(pinnedOnlyLength)

    } else {
      this.oracleOrder.next(oracles);
    }
  }

  storeLocally(oracleState: IOracle[], key: string): void {
    const packed = JSON.stringify(oracleState)
    localStorage.setItem(key, packed)
  }

  checkLocalStore(localStorageKey: string): string | null {
    return localStorage.getItem(localStorageKey)
  }

  getOracles(): Observable<IOracle[]> {
    return this.oracleOrder.asObservable();
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

  pin(oracleID: number, localStorageKey: string): void {
    let currentOrder = this.oracleOrder.getValue()

    let foundOracle = this.oracleOrder.getValue().find(oracle => oracle.iID === oracleID)
    if (foundOracle) {
      foundOracle.pinned = !foundOracle.pinned;
      const filteredOracles = currentOrder.filter(oracle => oracle.iID !== oracleID)
      const result = this.sortOracles(filteredOracles.concat(foundOracle))
      this.storeLocally(result, localStorageKey)
      this.oracleOrder.next(result)
    }
  }

  sortOracles(oracles: IOracle[]): IOracle[] {
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

  setCurrentPositionToIndex(oracles: IOracle[]): IOracle[] {
    return oracles.map((oracle, i) => ({ ...oracle, currentPosition: i }))
  }

  moveUp(oracleID: number): void {
    let currentOrder = this.oracleOrder.getValue()
    let pinned = currentOrder.filter(({ pinned }) => pinned)
    let unpinned = currentOrder.filter(({ pinned }) => !pinned)
    let result: IOracle[];

    const targetIndex = pinned.findIndex(item => item.iID === oracleID)
    const targetItem = pinned.slice(targetIndex, targetIndex + 1)
    if (targetIndex > 0) {
      result = this.setCurrentPositionToIndex(
        pinned
          .toSpliced(targetIndex, 1)
          .toSpliced(targetIndex - 1, 0, targetItem[0])
          .concat(unpinned)
      )

    } else {
      result = this.setCurrentPositionToIndex(
        pinned
          .toSpliced(targetIndex, 1)
          .toSpliced(pinned.length - 1, 0, targetItem[0])
          .concat(unpinned)
      )
    }
    this.storeLocally(result, this.storageLocation);
    this.oracleOrder.next(result);
  }

  moveDown(oracleID: number): void {
    let currentOrder = this.oracleOrder.getValue()
    let pinned = currentOrder.filter(({ pinned }) => pinned)
    let unpinned = currentOrder.filter(({ pinned }) => !pinned)
    let result: IOracle[];

    const targetIndex = currentOrder.findIndex(item => item.iID === oracleID)
    const targetItem = currentOrder.slice(targetIndex, targetIndex + 1)
    if (targetIndex < pinned.length - 1) {
      result = this.setCurrentPositionToIndex(
        pinned
          .toSpliced(targetIndex + 2, 0, targetItem[0])
          .toSpliced(targetIndex, 1)
          .concat(unpinned)
      )

    } else {
      result = this.setCurrentPositionToIndex(
        pinned
          .toSpliced(targetIndex, 1)
          .toSpliced(0, 0, targetItem[0])
          .concat(unpinned)
      )
    }
    this.storeLocally(result, this.storageLocation);
    this.oracleOrder.next(result);
  }
}

import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { IOracle, oracleType } from '../../data/oracle.model';
import { YnOracle } from '../../data/yn-oracle/yn-oracle';
import { Oracle } from '../oracle/oracle';
import { NgComponentOutlet } from '@angular/common';
import { HowOracle } from '../../data/how-oracle/how-oracle';
import { InspirationOracle } from '../../data/inspiration-oracle/inspiration-oracle';
import { OraclePinService } from '../../data/oracle.service';
import { Searchbar } from "../searchbar/searchbar";
import { CascadingOracle } from '../../data/cascading-oracle/cascading-oracle';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { storageToken } from '../../data/library';
import { map, Subscription } from 'rxjs';
import { ROUTER_TOKENS } from '../../app.routes';

@Component({
  selector: 'app-body',
  imports: [NgComponentOutlet, Searchbar],
  templateUrl: './body.html',
  styleUrl: './body.scss'
})
export class Body implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly oraclePinService = inject(OraclePinService);
  private querySubscription: Subscription | undefined;
  private paramSubscription: Subscription | undefined;
  private urlSubscription: Subscription | undefined;
  pathType: string = '';
  filterText: string = '';

  oracles: IOracle[] = [];
  pinnedArray: number[] = [];

  constructor(@Inject(storageToken) private readonly storageLocation: string) {
    this.renavigatePinned = this.renavigatePinned.bind(this);
    this.renavigateQuery = this.renavigateQuery.bind(this);
    this.renavigatePathType = this.renavigatePathType.bind(this);
  }

  ngOnInit(): void {

    this.urlSubscription = this.activatedRoute.url
      .pipe(map((segments) => segments.map((segment) => segment.path)))
      .subscribe((url) => {
        const pathRoot = url[0]
        this.pathType = pathRoot;
        this.oraclePinService.setOracleCategory(pathRoot)
      });

    this.querySubscription = this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {

      const queryEntry = params.get('filter')

      if (queryEntry) {
        this.filterText = queryEntry;
      } else {
        this.filterText = '';
      };

    })

    this.paramSubscription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {

      const matrixPinnedValue = params.get('pinned');

      const matrixParsedValue: number[] = matrixPinnedValue ?
        matrixPinnedValue.split(',').map(entry => parseInt(entry)) :
        [];

      const localParsedValue = this.checkLocalStore(this.storageLocation)

      if (matrixParsedValue.length > 0) {
        this.oraclePinService.setPinnedOracles(matrixParsedValue);
        this.pinnedArray = matrixParsedValue;
        this.renavigatePinned(matrixParsedValue);

      } else if (localParsedValue.length > 0) {
        this.oraclePinService.setPinnedOracles(localParsedValue);
        this.pinnedArray = localParsedValue;
        this.renavigatePinned(localParsedValue);
      } else {
        this.oraclePinService.setPinnedOracles([]);
        this.pinnedArray = [];
        this.renavigatePinned([]);
      };
    });




    this.oraclePinService.filteredOracles$.subscribe(
      (oracles) => (this.oracles = oracles)
    );

  }

  ngOnDestroy(): void {
    this.urlSubscription?.unsubscribe();
    this.paramSubscription?.unsubscribe();
    this.querySubscription?.unsubscribe();
  }


  renavigatePinned(pinned: number[]): void {

    if (pinned.length > 0) {
      this.router.navigate([`../${this.pathType}`, { pinned }], {
        relativeTo: this.activatedRoute,
        queryParams:
          this.filterText.length > 0 ?
            { filter: this.filterText, } :
            { filter: null }
        ,
        queryParamsHandling: 'merge',
      })
    } else {
      this.router.navigate([`../${this.pathType}`], {
        relativeTo: this.activatedRoute,
        queryParams:
          this.filterText.length > 0 ?
            { filter: this.filterText, } :
            { filter: null }
        ,
        queryParamsHandling: 'merge',
      })
    }
  }

  renavigateQuery(filterText: string): void {

    if (this.pinnedArray.length > 0) {
      this.router.navigate([`../${this.pathType}`, { pinned: this.pinnedArray }], {
        relativeTo: this.activatedRoute,
        queryParams:
          filterText.length > 0 ?
            { filter: filterText, } :
            { filter: null }
        ,
        queryParamsHandling: 'merge',
      })
    } else {
      this.router.navigate([`../${this.pathType}`], {
        relativeTo: this.activatedRoute,
        queryParams:
          filterText.length > 0 ?
            { filter: filterText, } :
            { filter: null }
        ,
        queryParamsHandling: 'merge',
      })
    }
  }

  private cyclePaths(currentPath: string): string {
    const paths: string[] = [ROUTER_TOKENS.SIMPLE, ROUTER_TOKENS.ADVANCED, ROUTER_TOKENS.ALL];
    const currentIndex = paths.indexOf(currentPath);
    if (currentIndex == paths.length - 1) {
      return paths[0]
    } else {
      return paths[currentIndex + 1]
    }

  }

  renavigatePathType(): void {
    const nextPathType = this.cyclePaths(this.pathType);

    if (this.pinnedArray.length > 0) {
      this.router.navigate([`../${nextPathType}`, { pinned: this.pinnedArray }], {
        relativeTo: this.activatedRoute,
        queryParams:
          this.filterText.length > 0 ?
            { filter: this.filterText, } :
            { filter: null }
        ,
        queryParamsHandling: 'merge',
      })
    } else {
      this.router.navigate([`../${nextPathType}`], {
        relativeTo: this.activatedRoute,
        queryParams:
          this.filterText.length > 0 ?
            { filter: this.filterText, } :
            { filter: null }
        ,
        queryParamsHandling: 'merge',
      })
    }
  }

  private checkLocalStore(location: string): number[] {
    const found = localStorage.getItem(location)
    if (found) {
      return JSON.parse(found)
    } else {
      return []
    }
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

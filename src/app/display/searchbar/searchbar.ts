import { Component, inject, OnDestroy, OnInit, Input, input } from '@angular/core';
import { OraclePinService } from '../../data/oracle.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { ROUTER_TOKENS } from '../../app.routes';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar implements OnInit, OnDestroy {
  pinnedArray: number[] = [];
  searchText: string = '';
  readonly router = inject(Router)
  readonly activatedRoute = inject(ActivatedRoute)
  private urlSubscription: Subscription | undefined;
  pathType: string = ''

  constructor(private oraclePinService: OraclePinService) {
    this.oraclePinService.getPinnedOracles().subscribe(pinnedOracles => {
      this.pinnedArray = pinnedOracles
    });
  }

  ngOnInit(): void {
    this.urlSubscription = this.activatedRoute.url
      .pipe(map((segments) => segments.map((segment) => segment.path)))
      .subscribe((url) => {
        const pathRoot = url[0]
        this.pathType = pathRoot;
        this.oraclePinService.setOracleCategory(pathRoot)
      })
  }

  ngOnDestroy(): void {
    this.urlSubscription?.unsubscribe();
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value || null;

    this.router.navigate([`../${this.pathType}`, { pinned: this.pinnedArray }], {
      relativeTo: this.activatedRoute,
      queryParams: { filter: value },
      queryParamsHandling: 'merge',
    })
    // this.oraclePinService.setSearchText(value)

  }

  onResetClick(): void {
    this.searchText = '';
    // this.oraclePinService.clearSearchText();

    this.router.navigate([`../${this.pathType}`, { pinned: this.pinnedArray }], {
      relativeTo: this.activatedRoute,
      queryParams: { filter: null },
      queryParamsHandling: 'merge',
    })
  }

}

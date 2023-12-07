import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { filterBy } from 'src/app/state/actions/filter.action';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isHome: boolean = true;
  filterControl = new FormControl('genre');

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateIsHome());
    this.updateIsHome();
  }

  updateIsHome() {
    this.isHome =
      !this.router.url.includes('details') &&
      !this.router.url.includes('watchlist');
  }

  goHome() {
    this.router.navigate(['']);
  }

  goToWatchlist() {
    this.router.navigate(['/watchlist']);
  }

  onSelectionChange(event: MatSelectChange) {
    this.store.dispatch(filterBy({ filter: event.value }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

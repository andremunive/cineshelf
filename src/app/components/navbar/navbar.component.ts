import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filterBy } from 'src/app/state/actions/filter.action';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isHome: boolean = true;
  filterControl = new FormControl('genre');

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.handleNavbarWithRoute();
    this.startRoute();
  }

  startRoute() {
    if (
      this.router.url.includes('details') ||
      this.router.url.includes('watchlist')
    ) {
      this.isHome = false;
      return;
    }
    this.isHome = true;
  }

  handleNavbarWithRoute() {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (
            event.url.includes('details') ||
            event.url.includes('watchlist')
          ) {
            this.isHome = false;
            return;
          }
          this.isHome = true;
        }
      })
    );
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
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { filterBy } from 'src/app/state/actions/filter.action';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  filterControl = new FormControl('genre');

  constructor(private store: Store<AppState>) {}

  onSelectionChange(event: MatSelectChange) {
    this.store.dispatch(filterBy({ filter: event.value }));
  }
}

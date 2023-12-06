import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FilterState } from 'src/app/core/models/filter.state';

export const selectFilterFeature = (state: AppState) => state.filter;

export const selectFilterOption = createSelector(
  selectFilterFeature,
  (state: FilterState) => state.filter
);

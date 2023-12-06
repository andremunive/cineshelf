import { ActionReducerMap } from '@ngrx/store';
import { filterReducers } from './reducers/filter.reducer';
import { FilterState } from '../core/models/filter.state';

export interface AppState {
  filter: FilterState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  filter: filterReducers,
};

import { createReducer, on } from '@ngrx/store';
import { FilterEnum } from 'src/app/core/enums/filter.enum';
import { FilterState } from 'src/app/core/models/filter.state';
import { filterBy } from '../actions/filter.action';

export const initialState: FilterState = { filter: FilterEnum.genre };

export const filterReducers = createReducer(
  initialState,
  on(filterBy, (state, { filter }) => {
    return { ...state, filter };
  })
);

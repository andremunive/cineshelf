import { createAction, props } from '@ngrx/store';

export const filterBy = createAction(
  '[Movies List] Filter By',
  props<{ filter: string }>()
);

import { createAction, props } from '@ngrx/store';
import { AppState } from './state';

export const setAPIStatus = createAction(
  '[API] success or failure status',
  props<{ apiStatus: AppState }>()
);

import { createAction, props } from '@ngrx/store';
import { Appstate } from './state';

export const setAPIStatus = createAction(
  '[API] success or failure status',
  props<{ apiStatus: Appstate }>()
);

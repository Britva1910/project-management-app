import { createAction, props } from '@ngrx/store';
import { AppState } from './state';

export const setAPIStatus = createAction(
  '[API] success or failure status',
  props<{ apiStatus: AppState }>()
);

export const setUserData = createAction(
  '[AUTH] set user data',
  props<{ token: string; userId: string }>()
);

export const setCurrentBoard = createAction(
  '[BOARD] set current board',
  props<{ id: string }>()
);

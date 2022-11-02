import { createReducer, on } from '@ngrx/store';
import { setAPIStatus } from './app.action';
import { Appstate } from './state';
import { initialState } from './state';

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }): Appstate => {
    return {
      ...state,
      ...apiStatus,
    };
  })
);

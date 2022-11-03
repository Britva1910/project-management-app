import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, setUserId, setUserToken } from './app.action';
import { AppState } from './state';
import { initialState } from './state';

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }): AppState => {
    return {
      ...state,
      ...apiStatus,
    };
  }),
  on(setUserToken, (state, action): AppState => {
    return {
      ...state,
      token: action.token,
    };
  }),
  on(setUserId, (state, action): AppState => {
    return {
      ...state,
      userId: action.userId,
    };
  })
);

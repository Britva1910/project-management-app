import { createReducer, on } from '@ngrx/store';
import { setAPIStatus, setUserData, setCurrentBoard } from './app.action';
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
  on(setUserData, (state, action): AppState => {
    return {
      ...state,
      token: action.token,
      userId: action.userId,
    };
  }),
  on(setCurrentBoard, (state, action): AppState => {
    return {
      ...state,
      currentBoardId: action.id,
    };
  })
);

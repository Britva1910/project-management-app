import { on, createReducer } from '@ngrx/store';
import { boardFetchAPISuccess } from '../actions/board.actions';
import { State, initialState } from './../state/state';

export const boardReducer = createReducer(
  initialState,
  on(boardFetchAPISuccess, (state, { boardResponse }): State => {
    return boardResponse;
  })
);

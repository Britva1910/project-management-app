import { on, createReducer } from '@ngrx/store';
import { boardFetchAPISuccess } from './board.actions';
import { StateBoard, initialStateBoard } from './state-board';

export const boardReducer = createReducer(
  initialStateBoard,
  on(boardFetchAPISuccess, (state, { boardResponse }): StateBoard => {
    return boardResponse;
  })
);

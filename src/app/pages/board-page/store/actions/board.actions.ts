import { createAction, props } from '@ngrx/store';
import { BoardResponse } from './../../models/interfaces';

export const invokeBoardAPI = createAction(
  '[Board API] Invoke Board Fetch API'
);

export const boardFetchAPISuccess = createAction(
  '[Board API] Fetch API Success',
  props<{ boardResponse: BoardResponse }>()
);

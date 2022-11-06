import { createAction, props } from '@ngrx/store';
import { BoardResponse } from '../../../shared/models/interfaces/interfaces-board';
import { CreateTaskBody } from './../../../shared/models/interfaces/interfaces-board';

export const invokeBoardAPI = createAction(
  '[Board API] Invoke Board Fetch API'
);

export const boardFetchAPISuccess = createAction(
  '[Board API] Fetch API Success',
  props<{ boardResponse: BoardResponse }>()
);

export const invokeSaveNewTaskAPI = createAction(
  '[Board API] Inovke save new task api',
  props<{ newTask: CreateTaskBody }>()
);

export const saveNewTaskAPISucess = createAction(
  '[Board API] save new board api success',
  props<{ newTask: CreateTaskBody }>()
);

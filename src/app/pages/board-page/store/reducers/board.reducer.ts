import { createReducer } from '@ngrx/store';
import { State } from './../../models/interfaces';

export const initialState: ReadonlyArray<State> = [];

export const boardReducer = createReducer(initialState);

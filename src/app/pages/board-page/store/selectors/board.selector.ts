import { createFeatureSelector } from '@ngrx/store';
import { State } from './../state/state';

export const selectBoards = createFeatureSelector<State>('myboard');

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateBoard } from './state-board';

export const selectBoards = createFeatureSelector<StateBoard>('myboard');

export const selectIdBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.id
);

export const selectTitleBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.title
);

export const selectDescriptionBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.description
);

export const selectColumnsBoard = createSelector(
  selectBoards,
  (state: StateBoard) => state.columns
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './../state/state';

export const selectBoards = createFeatureSelector<State>('myboard');

export const selectIdBoard = createSelector(
  selectBoards,
  (state: State) => state.id
);

export const selectTitleBoard = createSelector(
  selectBoards,
  (state: State) => state.title
);

export const selectDescriptionBoard = createSelector(
  selectBoards,
  (state: State) => state.description
);

export const selectColumnsBoard = createSelector(
  selectBoards,
  (state: State) => state.columns
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateBoard } from './state-board';
import { Column } from './../../../shared/models/interfaces/interfaces-board';

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

export const selectColumnById = (columnId: string) =>
  createSelector(selectColumnsBoard, (state: Column[]) => {
    const columnChecked = state.filter((column) => column.id === columnId);
    return columnChecked[0];
  });

export const selectTaskById = (idColumn: string, idTask: string) =>
  createSelector(selectBoards, (state: StateBoard) => {
    const columnChecked = state.columns.filter(
      (column) => column.id == idColumn
    );
    if (!columnChecked[0]) return null;
    const taskChecked = columnChecked[0].tasks.filter(
      (task) => task.id == idTask
    );
    if (!taskChecked[0]) return null;
    console.log(taskChecked[0]);
    return taskChecked[0];
  });

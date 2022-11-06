import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectColumnById, selectBoards } from '../store/board.selector';
import { LocalStorageService } from './../../../shared/services/local-storage-service/local-storage.service';
import {
  Column,
  Tasks,
  AddTaskEvent,
  CreateTaskBody,
} from './../../../shared/models/interfaces/interfaces-board';
import { TasksDataService } from 'src/app/shared/services/tasks-data-service/tasks-data.service';
import { invokeBoardAPI } from './../store/board.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ColumnDataService } from './../../../shared/services/colums-data-service/column-data.service';

@Injectable()
export class EditTaskService {
  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private tasksDataService: TasksDataService,
    private columnDataService: ColumnDataService
  ) {}

  private isShowEditTaskModal$ = new BehaviorSubject<boolean>(false);

  public showEditModal$(): Observable<boolean> {
    return this.isShowEditTaskModal$.asObservable();
  }

  public openEditModal$() {
    this.isShowEditTaskModal$.next(true);
  }

  public closeEditModal$() {
    this.isShowEditTaskModal$.next(false);
  }

  public checkIdTask = '';

  public checkIdColumn = '';

  public checkIdBoard = '';

  public checkColumn!: Column;

  public checkTask!: Tasks;

  public getBoardId() {
    let board = this.store.select(selectBoards);
    board.subscribe((col) => (this.checkIdBoard = col.id));
  }

  private getColumnById(idColumn: string) {
    let column: Observable<Column> = this.store.select(
      selectColumnById(idColumn)
    );
    column.subscribe((col) => (this.checkColumn = col));
  }

  public editTask(idTask: string, idColumn: string) {
    this.getBoardId();
    this.getColumnById(idColumn);
    const arrTaskOneColumn = this.checkColumn.tasks;
    this.checkTask = arrTaskOneColumn.filter((task) => task.id === idTask)[0];
    this.openEditModal$();
  }

  public hideTitleColumn(index: number, columnId: string) {
    this.getBoardId();
    this.checkIdColumn = columnId;
    this.getColumnById(columnId);
    const titleColumn = document.getElementsByClassName('title-column')[index];
    titleColumn.classList.add('hide-class');
    const editContainer =
      document.getElementsByClassName('edit-container')[index];
    editContainer.classList.add('visible-class');
  }

  public showTitleColumn(index: number) {
    const titleColumn = document.getElementsByClassName('title-column')[index];
    titleColumn.classList.remove('hide-class');
    const editContainer =
      document.getElementsByClassName('edit-container')[index];
    editContainer.classList.remove('visible-class');
  }

  public addNewTask(userTaskData: AddTaskEvent, idColumn: string) {
    this.getBoardId();
    const userId: string = this.localStorageService
      .getFromLocalStorage('userId')
      .toString();
    userTaskData.value.userId = userId;
    const bodyRequest: CreateTaskBody = userTaskData.value;
    this.tasksDataService
      .createTask(this.checkIdBoard, idColumn, bodyRequest)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }

  public deleteTask(idTask: string, idColumn: string) {
    this.getBoardId();
    this.tasksDataService
      .deleteTask(this.checkIdBoard, idColumn, idTask)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }

  public addNewColumn(newColumnTitle: { title: string }) {
    this.getBoardId();
    this.columnDataService
      .createColumn(this.checkIdBoard, newColumnTitle)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }

  public deleteColumn(columnId: string) {
    this.getBoardId();
    this.columnDataService.deleteColumn(this.checkIdBoard, columnId).subscribe({
      next: () => {
        this.store.dispatch(invokeBoardAPI());
      },
      error: (error: HttpErrorResponse) =>
        console.log(`Error - ${error.error.message}`),
    });
  }
}

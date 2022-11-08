import { Injectable } from '@angular/core';
import { ColumnDataService } from './../../../shared/services/colums-data-service/column-data.service';
import { TasksDataService } from 'src/app/shared/services/tasks-data-service/tasks-data.service';
import { EditTaskService } from './edit-task.service';
import {
  Column,
  Tasks,
} from './../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { invokeBoardAPI } from './../store/board.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DragnDropService {
  constructor(
    private store: Store,
    private tasksDataService: TasksDataService,
    private columnDataService: ColumnDataService,
    private editTaskService: EditTaskService
  ) {}

  public dropColumn(newOrderColumn: number, checkCol: Column) {
    this.editTaskService.getBoardId();
    const bodyRequest = {
      title: checkCol.title,
      order: newOrderColumn,
    };
    this.columnDataService
      .updateColumn(this.editTaskService.checkIdBoard, checkCol.id, bodyRequest)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }

  public dropTasks(newOrderTask: number, idColumn: string, checkTask: Tasks) {
    this.editTaskService.getBoardId();
    const bodyRequest = {
      title: checkTask.title,
      order: newOrderTask,
      description: checkTask.description,
      userId: checkTask.userId,
      boardId: this.editTaskService.checkIdBoard,
      columnId: idColumn,
    };
    this.tasksDataService
      .updateTask(
        this.editTaskService.checkIdBoard,
        idColumn,
        checkTask.id,
        bodyRequest
      )
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
          console.log('запрос пошел');
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }

  public dropTasksBetweenColumn(
    newOrderTask: number,
    idColumn: string,
    checkTask: Tasks
  ) {
    this.editTaskService.getBoardId();
    const bodyReqCreate = {
      title: checkTask.title,
      description: checkTask.description,
      userId: checkTask.userId,
    };
    //const bodyReqUpdate = {
    //title: checkTask.title,
    //order: newOrderTask,
    //description: checkTask.description,
    //userId: checkTask.userId,
    //boardId: this.editTaskService.checkIdBoard,
    //columnId: idColumn,
    //};
    this.tasksDataService
      .createTask(this.editTaskService.checkIdBoard, idColumn, bodyReqCreate)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
          console.log('запрос пошел');
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
    //.subscribe({
    //next: () => {
    //console.log('запрос создания прошел успешно');
    //this.tasksDataService
    //.updateTask(
    //this.editTaskService.checkIdBoard,
    //idColumn,
    //checkTask.id,
    //bodyReqUpdate
    //)
    //.subscribe({
    //next: () => {
    //console.log('запрос обновления прошел успешно');
    //this.store.dispatch(invokeBoardAPI());
    //console.log('запрос на новый масив прошел успешно');
    //},
    //error: (error: HttpErrorResponse) =>
    //console.log(`Error - ${error.error.message}`),
    //});
    //},
    //error: (error: HttpErrorResponse) =>
    //console.log(`Error - ${error.error.message}`),
    //});
  }
}

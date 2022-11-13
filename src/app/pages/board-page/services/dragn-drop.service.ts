import { Injectable } from '@angular/core';
import { ColumnDataService } from './../../../shared/services/colums-data-service/column-data.service';
import { TasksDataService } from 'src/app/shared/services/tasks-data-service/tasks-data.service';
import { EditTaskService } from './edit-task.service';
import {
  Column,
  Tasks,
  UpdateOneTaskBody,
  CreateTaskBody,
  CreateTaskResponse,
  UpdateColumnBody,
} from './../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { invokeBoardAPI } from './../store/board.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './../../../shared/services/local-storage-service/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DragnDropService {
  constructor(
    private store: Store,
    private tasksDataService: TasksDataService,
    private columnDataService: ColumnDataService,
    private editTaskService: EditTaskService,
    private localStorageService: LocalStorageService
  ) {}

  private isRequestServer$ = new BehaviorSubject<boolean>(false);

  public getIsRequestServer(): boolean {
    return this.isRequestServer$.getValue();
  }

  public getIsRequestServer$(): Observable<boolean> {
    return this.isRequestServer$.asObservable();
  }

  public setIsRequestServer() {
    this.isRequestServer$.next(!this.getIsRequestServer());
  }

  public dropColumn(newOrderColumn: number, checkCol: Column) {
    this.editTaskService.getBoardId();
    const bodyRequest: UpdateColumnBody = {
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
    const bodyRequest: UpdateOneTaskBody = {
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
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }

  public dropTasksBetweenColumn(
    newOrderTask: number,
    idColumnNew: string,
    checkTask: Tasks
  ) {
    this.setIsRequestServer();
    this.editTaskService.getBoardId();
    const idBoard: string = this.editTaskService.checkIdBoard;
    const idColumnPrev: string = this.editTaskService.getIdColByidTasks(
      this.editTaskService.arrColumns,
      checkTask.id
    );
    const userId: string = this.localStorageService
      .getFromLocalStorage('userId')
      .toString();
    const bodyReqCreate: CreateTaskBody = {
      title: checkTask.title,
      description: checkTask.description,
      userId: userId,
    };
    this.tasksDataService
      .createTask(idBoard, idColumnNew, bodyReqCreate)
      .subscribe({
        next: (res: CreateTaskResponse) => {
          const bodyReqUpdate: UpdateOneTaskBody = {
            title: res.title,
            order: newOrderTask,
            description: res.description,
            userId: res.userId,
            boardId: idBoard,
            columnId: idColumnNew,
          };
          this.tasksDataService
            .updateTask(idBoard, idColumnNew, res.id, bodyReqUpdate)
            .subscribe({
              next: () => {
                this.tasksDataService
                  .deleteTask(idBoard, idColumnPrev, checkTask.id)
                  .subscribe({
                    next: () => {
                      this.store.dispatch(invokeBoardAPI());
                      this.setIsRequestServer();
                    },
                    error: (error: HttpErrorResponse) =>
                      console.log(`Error - ${error.error.message}`),
                  });
              },
              error: (error: HttpErrorResponse) =>
                console.log(`Error - ${error.error.message}`),
            });
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }
}

import { Component } from '@angular/core';
import {
  Tasks,
  CreateTaskBody,
} from './../../../../shared/models/interfaces/interfaces-board';
import { EditTaskService } from './../../services/edit-task.service';
import { CountFiledFormService } from '../../services/modal-prompt.cervice';
import { TasksDataService } from './../../../../shared/services/tasks-data-service/tasks-data.service';
import { UserBoardService } from './../../services/user-board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectColumnsBoard } from './../../store/board.selector';
import { StorDataService } from './../../../../shared/services/stor-service/stor-data.service';
import { LocalStorageService } from './../../../../shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.scss'],
})
export class BoardContainerComponent {
  public data = 'Delete column?';

  constructor(
    private countFiledFormService: CountFiledFormService,

    private editTaskService: EditTaskService,

    private taskDataService: TasksDataService,

    private storDataService: StorDataService,

    private localStorageService: LocalStorageService,

    private store: Store,

    public userBoardService: UserBoardService
  ) {}

  public isShow$ = this.editTaskService.showEditModal$();

  public columns$ = this.store.select(selectColumnsBoard);

  public onDeleteTask(idTask: string, idColumn: string) {
    const idBoard = '1'; // from globalStor
    console.log(idBoard, idColumn, idTask);
    this.taskDataService.deleteTask(idBoard, idColumn, idTask);
  }

  public addNewTask(event: any, idColumn: string) {
    if (event) {
      this.editTaskService.getBoardId();
      const idBoard = this.editTaskService.checkIdBoard;
      const userId = this.localStorageService.getFromLocalStorage('userId');
      event.value.userId = userId;
      const bodyRequest: CreateTaskBody = event.value;
      //const userId = this.storDataService.getIdUser();
      console.log(idBoard, idColumn, bodyRequest);
      this.taskDataService.createTask(idBoard, idColumn, bodyRequest);
    }
  }

  public deleteColumn(event: any, column: string) {
    if (event.clicked) {
      console.log(event, column);
    }
  }

  public setTwoFieldForm() {
    this.countFiledFormService.setTwoFiledForm();
  }

  public updateTask(idTask: string, idColumn: string) {
    console.log(idTask, idColumn);
    this.editTaskService.editTask(idTask, idColumn);
  }

  public drop(event: CdkDragDrop<Tasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

import { Component } from '@angular/core';
import {
  Tasks,
  AddTaskEvent,
} from './../../../../shared/models/interfaces/interfaces-board';

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
import { EditTaskService } from './../../services/edit-task.service';
import { ColumnDataService } from './../../../../shared/services/colums-data-service/column-data.service';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.scss'],
})
export class BoardContainerComponent {
  public data = 'Delete column?';

  constructor(
    private countFiledFormService: CountFiledFormService,

    public editTaskService: EditTaskService,

    public taskDataService: TasksDataService,

    public columnDataService: ColumnDataService,

    private store: Store,

    public userBoardService: UserBoardService
  ) {}

  public isShow$ = this.editTaskService.showEditModal$();

  public columns$ = this.store.select(selectColumnsBoard);

  private isOpenEditColumn = false;

  public titleColumn = '';

  public onDeleteTask(idTask: string, idColumn: string) {
    const idBoard = '1'; // from globalStor
    console.log(idBoard, idColumn, idTask);
    this.taskDataService.deleteTask(idBoard, idColumn, idTask);
  }

  public addNewTask(event: AddTaskEvent, idColumn: string) {
    if (event) {
      console.log(idColumn, event.value);
    }
  }

  public deleteColumn(event: any, column: string) {
    if (event.clicked) {
      this.isOpenEditColumn = false;
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

  public hideTitleColumn(index: number, columnId: string) {
    if (!this.isOpenEditColumn) {
      this.isOpenEditColumn = true;
      this.editTaskService.hideTitleColumn(index, columnId);
      this.titleColumn = this.editTaskService.checkColumn.title;
    }
  }

  public showTitleColumn(index: number) {
    this.isOpenEditColumn = false;
    this.editTaskService.showTitleColumn(index);
  }

  public updateTitleColumn(idColumn: string, index: number) {
    this.showTitleColumn(index);
    const boardId = this.editTaskService.checkIdBoard;
    const orderColumn = this.editTaskService.checkColumn.order;
    const bodyRequest = {
      title: this.titleColumn,
      order: orderColumn,
    };
    console.log(boardId, idColumn, bodyRequest);
    this.columnDataService.updateColumn(boardId, idColumn, bodyRequest);
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

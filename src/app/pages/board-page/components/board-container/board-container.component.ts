import { Component } from '@angular/core';
import {
  Tasks,
  AddTaskEvent,
} from './../../../../shared/models/interfaces/interfaces-board';

import { CountFiledFormService } from '../../services/modal-prompt.cervice';
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
    private editTaskService: EditTaskService,
    public columnDataService: ColumnDataService,
    private store: Store,
    public userBoardService: UserBoardService
  ) {}

  public isShow$ = this.editTaskService.showEditModal$();

  public columns$ = this.store.select(selectColumnsBoard);

  private isOpenEditColumn = false;

  public titleColumn = '';

  public onDeleteTask(idTask: string, idColumn: string) {
    this.editTaskService.deleteTask(idTask, idColumn);
  }

  public addNewTask(userTaskData: AddTaskEvent, idColumn: string) {
    if (userTaskData) {
      this.editTaskService.addNewTask(userTaskData, idColumn);
    }
  }

  public updateTask(idTask: string, idColumn: string) {
    console.log(idTask, idColumn);
    this.editTaskService.editTask(idTask, idColumn);
  }

  public deleteColumn(confirmItem: any, columnId: string) {
    if (confirmItem.clicked) {
      console.log(confirmItem);
      this.isOpenEditColumn = false;
      this.editTaskService.deleteColumn(columnId);
    }
  }

  public setTwoFieldForm() {
    this.countFiledFormService.setTwoFiledForm();
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

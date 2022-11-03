import { Component } from '@angular/core';
import { Tasks } from './../../../../shared/models/interfaces/interfaces-board';
import { UserBoardService } from './../../services/user-board.service';
import { Store } from '@ngrx/store';
import { selectColumnsBoard } from '../../store/board.selector';
import { TasksDataService } from './../../../../shared/services/tasks-data-service/tasks-data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.scss'],
})
export class BoardContainerComponent {
  public data = 'Delete column?';

  constructor(
    public userBoardService: UserBoardService,

    public taskDataService: TasksDataService,

    private store: Store
  ) {}

  public columns$ = this.store.select(selectColumnsBoard);

  public onDeleteTask(idTask: string, idColumn: string) {
    const idBoard = '1'; // from globalStor
    console.log(idBoard, idColumn, idTask);
    this.taskDataService.deleteTask(idBoard, idColumn, idTask);
  }

  public onAddCard(event: any, idColumn: string) {
    if (event) {
      console.log(idColumn, event.value);
    }
  }

  public deleteColumn(event: any, column: string) {
    if (event.clicked) {
      console.log(event, column);
    }
  }

  drop(event: CdkDragDrop<Tasks[]>) {
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

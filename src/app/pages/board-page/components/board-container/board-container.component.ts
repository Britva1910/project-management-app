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
  constructor(
    public userBoardService: UserBoardService,

    public taskDataService: TasksDataService,

    private store: Store
  ) {}

  public columns$ = this.store.select(selectColumnsBoard);

  onDeleteTask(idTask: string, idColumn: string) {
    const idBoard = ''; // from globalStor
    this.taskDataService.deleteTask(idBoard, idColumn, idTask);
  }

  onAddCard(event: Event, idColumn: string) {
    console.log(idColumn, event);
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

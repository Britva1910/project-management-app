import { Component } from '@angular/core';
import { Tasks } from '../../models/interfaces';
//import { Column } from './../../models/interfaces';
import { UserBoardService } from './../../services/user-board.service';
import { Store } from '@ngrx/store';
import { selectColumnsBoard } from './../../store/selectors/board.selector';
import { ApiBoardService } from './../../services/api-board.service';
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

    public apiBoardService: ApiBoardService,

    private store: Store
  ) {}

  public columns$ = this.store.select(selectColumnsBoard);

  onDeleteTask(idTask: string, idColumn: string) {
    this.apiBoardService.deleteTask(idTask, idColumn);
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

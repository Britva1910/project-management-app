import { Component } from '@angular/core';
import { UserBoardService } from './../../services/user-board.service';
import { Store } from '@ngrx/store';
import { selectColumnsBoard } from './../../store/selectors/board.selector';
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
    private store: Store
  ) {}

  public columns$ = this.store.select(selectColumnsBoard);

  drop(event: CdkDragDrop<string[]>) {
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

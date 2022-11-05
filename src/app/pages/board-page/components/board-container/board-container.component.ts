import { Component } from '@angular/core';
import { Tasks } from './../../../../shared/models/interfaces/interfaces-board';
import { UserBoardService } from './../../services/user-board.service';
import { Store } from '@ngrx/store';
import { selectColumnsBoard } from '../../store/board.selector';
import { CountFiledFormService } from '../../services/modal-prompt.cervice';
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
    private countFiledFormService: CountFiledFormService,

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

  public setTwoFieldForm() {
    this.countFiledFormService.setTwoFiledForm();
  }

  public hideTitle(index: number) {
    const titleColumn = document.getElementsByClassName('title-column')[index];
    titleColumn.classList.add('hide-class');
    const editContainer =
      document.getElementsByClassName('edit-container')[index];
    editContainer.classList.add('visible-class');
  }

  public showTitle(index: number) {
    const titleColumn = document.getElementsByClassName('title-column')[index];
    titleColumn.classList.add('visible-class');
    const editContainer =
      document.getElementsByClassName('edit-container')[index];
    editContainer.classList.add('hide-class');
  }

  public titleColumn: any = 'ffff';

  public editColumn(columnId: string) {
    console.log(columnId);
  }

  public onEdit() {
    console.log('columnId');
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

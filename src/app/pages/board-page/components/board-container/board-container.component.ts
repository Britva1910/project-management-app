import { Component } from '@angular/core';
import { Tasks } from './../../../../shared/models/interfaces/interfaces-board';
import { EditTaskService } from './../../services/edit-task.service';
import { TasksDataService } from './../../../../shared/services/tasks-data-service/tasks-data.service';
import { UserBoardService } from './../../services/user-board.service';
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
    public editTaskService: EditTaskService,

    public taskDataService: TasksDataService,

    public userBoardService: UserBoardService
  ) {}

  onDeleteTask(idTask: string, idColumn: string) {
    const idBoard = ''; // from globalStor
    this.taskDataService.deleteTask(idBoard, idColumn, idTask);
  }

  updateTask(idTask: string, idColumn: string) {
    this.editTaskService.editTask(idTask, idColumn);
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

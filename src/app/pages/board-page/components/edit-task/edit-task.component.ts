import { Component } from '@angular/core';
import { EditTaskService } from './../../services/edit-task.service';
import { TasksDataService } from './../../../../shared/services/tasks-data-service/tasks-data.service';
//import { Subscription } from 'rxjs';
//import { UpdateOneTaskBody } from './../../../../shared/models/interfaces/interfaces-board';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  //subscription: Subscription[] = [];

  constructor(
    private editTaskService: EditTaskService,
    private tasksDataService: TasksDataService
  ) {}

  public taskForm = {
    title: this.editTaskService.checkTask.title,
    order: this.editTaskService.checkTask.order,
    description: this.editTaskService.checkTask.description,
    userId: this.editTaskService.checkTask.userId,
    boardId: this.editTaskService.checkIdBoard,
    columnId: this.editTaskService.checkIdColumn,
  };

  //ngOnDestroy() {
  // if (this.subscription.length) {
  //    this.subscription.forEach((data) => data.unsubscribe());
  //  }
  //}

  updateTask() {
    const boardId = this.editTaskService.checkIdBoard;
    const columnId = this.editTaskService.checkIdColumn;
    const taskId = this.editTaskService.checkIdTask;
    const bodyRequest = this.taskForm;
    console.log('put', bodyRequest);
    this.tasksDataService.updateTask(boardId, columnId, taskId, bodyRequest);
  }

  public close() {
    this.editTaskService.closeEditModal$();
  }
}

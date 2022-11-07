import { Injectable } from '@angular/core';
import { ColumnDataService } from './../../../shared/services/colums-data-service/column-data.service';
import { TasksDataService } from 'src/app/shared/services/tasks-data-service/tasks-data.service';
import { EditTaskService } from './edit-task.service';
//import { selectColumnByOrder } from './../store/board.selector';
//import { Observable } from 'rxjs';
import { Column } from './../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { invokeBoardAPI } from './../store/board.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DragnDropService {
  constructor(
    private store: Store,
    private tasksDataService: TasksDataService,
    private columnDataService: ColumnDataService,
    private editTaskService: EditTaskService
  ) {}

  /*public checkColumn!: Column;

  private getColumnByOrder(order: number) {
    let column: Observable<Column> = this.store.select(
      selectColumnByOrder(order)
    );
    column.subscribe((col) => (this.checkColumn = col));
    console.log(this.checkColumn);
  }
*/
  public dropColumn(newOrderColumn: number, checkCol: Column) {
    this.editTaskService.getBoardId();
    const bodyRequest = {
      title: checkCol.title,
      order: newOrderColumn,
    };
    console.log(this.editTaskService.checkIdBoard, checkCol.id, bodyRequest);
    this.columnDataService
      .updateColumn(this.editTaskService.checkIdBoard, checkCol.id, bodyRequest)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
          console.log('запрос прошел');
        },
        error: (error: HttpErrorResponse) =>
          console.log(`Error - ${error.error.message}`),
      });
  }
}

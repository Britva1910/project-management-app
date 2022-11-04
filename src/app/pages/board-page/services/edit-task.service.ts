import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
//import { UpdateOneTaskBody } from '../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { selectColumnById, selectBoards } from '../store/board.selector';
import {
  Column,
  Tasks,
} from './../../../shared/models/interfaces/interfaces-board';

@Injectable()
export class EditTaskService {
  constructor(private store: Store) {}

  private isShowEditTaskModal$ = new BehaviorSubject<boolean>(false);

  public showEditModal$(): Observable<boolean> {
    return this.isShowEditTaskModal$.asObservable();
  }

  public openEditModal$() {
    this.isShowEditTaskModal$.next(true);
  }

  public closeEditModal$() {
    this.isShowEditTaskModal$.next(false);
  }

  public checkIdTask = '';

  public checkIdColumn = '';

  public checkIdBoard = '';

  private checkColumn!: Column;

  public checkTask!: Tasks;

  //private checkTask$ = new Subject<UpdateOneTaskBody>();

  //public getCheckTask$(): Observable<UpdateOneTaskBody> {
  //  return this.checkTask$.asObservable();
  //}

  //public setCheckTask$(task: UpdateOneTaskBody) {
  //  this.checkTask$.next(task);
  //}

  private getBoardId() {
    let board = this.store.select(selectBoards);
    board.subscribe((col) => (this.checkIdBoard = col.id));
  }

  private getColumnById(idColumn: string) {
    let column = this.store.select(selectColumnById(idColumn));
    column.subscribe((col) => (this.checkColumn = col));
  }

  public editTask(idTask: string, idColumn: string) {
    this.getBoardId();
    this.getColumnById(idColumn);
    const arrTaskOneColumn = this.checkColumn.tasks;
    this.checkTask = arrTaskOneColumn.filter((task) => task.id === idTask)[0];
    //this.setCheckTask$({
    // title: this.checkTask.title,
    //  order: this.checkTask.order,
    //  description: this.checkTask.description,
    //  userId: this.checkTask.userId,
    //  columnId: idColumn,
    //  boardId: this.checkIdBoard,
    //  });
    this.openEditModal$();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { EditTask } from '../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { selectTaskById } from '../store/board.selector';

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

  private checkTask$ = new BehaviorSubject<EditTask>({
    title: '',
    description: '',
  });

  public getCheckTask$(): EditTask {
    return this.checkTask$.getValue();
  }

  public setCheckTask$(task: EditTask) {
    this.checkTask$.next(task);
  }

  public editTask(idTask: string, idColumn: string) {
    this.openEditModal$();
    this.store.select(selectTaskById(idColumn, idTask)).pipe(
      switchMap(async (data) => {
        if (data) {
          this.setCheckTask$({
            title: data.title,
            description: data.description,
          });
        }
      })
    );
  }
}

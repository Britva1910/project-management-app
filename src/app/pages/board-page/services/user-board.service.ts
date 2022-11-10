import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class UserBoardService {
  private isShowModal$ = new BehaviorSubject<boolean>(false);

  public getIsShowModal$(): Observable<boolean> {
    return this.isShowModal$.asObservable();
  }

  public openEditModal$() {
    this.isShowModal$.next(true);
  }

  public closeEditModal$() {
    this.isShowModal$.next(false);
  }
}

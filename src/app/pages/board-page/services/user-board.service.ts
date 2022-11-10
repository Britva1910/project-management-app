import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/interfaces/interfaces-board';
import { UserDataService } from './../../../shared/services/user-data-service/user-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserBoardService {
  constructor(private userDataService: UserDataService) {}

  private allUsers: Array<User> = [];

  public getUserNameById(idUser: string): string {
    return this.allUsers.filter((user) => user.id === idUser)[0].name;
  }

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

  public getAllUsers() {
    this.userDataService.getAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
      },
      error: (error: HttpErrorResponse) =>
        console.log(`Error - ${error.error.message}`),
    });
  }
}

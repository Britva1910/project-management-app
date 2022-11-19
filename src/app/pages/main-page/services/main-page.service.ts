import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddTaskEvent } from './../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { setCurrentBoard } from './../../../shared/store/app.action';
import { LocalStorageService } from './../../../shared/services/local-storage-service/local-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class MainPageService {
  private allBoards$ = new BehaviorSubject<OneBoard[]>([]);

  public searchWord = new BehaviorSubject<string>('');

  public sortOrder = new BehaviorSubject<string>('by default');

  public editModalStatus = new BehaviorSubject<boolean>(false);

  public boardId = new BehaviorSubject<string>('');

  constructor(
    private boardsDataService: BoardsDataService,
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  public getAllBoards$() {
    return this.allBoards$.asObservable();
  }

  public setAllBoards$(data: OneBoard[]) {
    this.allBoards$.next(data);
  }

  public getAllBoard() {
    this.boardsDataService.getAllBoards().subscribe({
      next: (data: OneBoard[]) => {
        this.allBoards$.next(data);
      },
      error: (error: HttpErrorResponse) =>
        console.log(`Error - ${error.error.message}`),
    });
  }

  public deleteBoard(idBoard: string) {
    this.boardsDataService.deleteBoard(idBoard).subscribe({
      next: () => {
        this.boardsDataService.getAllBoards().subscribe({
          next: (item: OneBoard[]) => {
            this.allBoards$.next(item);
          },
          error: (error: HttpErrorResponse) =>
            console.log(`Error - ${error.error.message}`),
        });
      },
      error: (error: HttpErrorResponse) =>
        console.log(`Error - ${error.error.message}`),
    });
  }

  public createBoard(data: AddTaskEvent) {
    this.boardsDataService.createBoard(data.value).subscribe({
      next: () => {
        this.boardsDataService.getAllBoards().subscribe({
          next: (item: OneBoard[]) => {
            this.allBoards$.next(item);
          },
          error: (error: HttpErrorResponse) =>
            console.log(`Error - ${error.error.message}`),
        });
      },
      error: (error: HttpErrorResponse) =>
        console.log(`Error - ${error.error.message}`),
    });
  }

  public saveIdCurrentBoard(id: string) {
    this.store.dispatch(setCurrentBoard({ id }));
    this.localStorageService.saveInLocalStorage('currentBoard', id);
    this.router.navigate(['board', id]);
    this.spinnerService.show();
  }
}

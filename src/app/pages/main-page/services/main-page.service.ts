import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddTaskEvent } from './../../../shared/models/interfaces/interfaces-board';

@Injectable()
export class MainPageService {
  private allBoards$ = new BehaviorSubject<OneBoard[]>([]);

  public searchWord = new BehaviorSubject<string>('');

  public sortOrder = new BehaviorSubject<string>('Default');

  public editModalStatus = new BehaviorSubject<boolean>(false);

  public boardId = new BehaviorSubject<string>('');

  constructor(private boardsDataService: BoardsDataService) {}

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
}

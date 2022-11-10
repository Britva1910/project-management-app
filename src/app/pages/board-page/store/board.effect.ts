import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { boardFetchAPISuccess, invokeBoardAPI } from './board.actions';
import { BoardsDataService } from '../../../shared/services/boards-data-service/boards-data.service';
import { StorDataService } from './../../../shared/services/stor-service/stor-data.service';
import { Store } from '@ngrx/store';

@Injectable()
export class BoardEffect {
  constructor(
    private actions$: Actions,
    private boardData: BoardsDataService,
    private storDataService: StorDataService,
    private store: Store
  ) {}

  private idBoard = '4d5b3c0e-38ad-4ecb-9740-900f181f895e'; //берём в общем store?

  private idBoardStor: string = this.storDataService.getIdCurrentBoard(); //это с общего стора

  loadBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeBoardAPI),
      switchMap(() =>
        this.boardData
          .getBoardById(this.idBoard)
          .pipe(map((data) => boardFetchAPISuccess({ boardResponse: data })))
      )
    );
  });
}

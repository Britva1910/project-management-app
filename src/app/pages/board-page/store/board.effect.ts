import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { boardFetchAPISuccess, invokeBoardAPI } from './board.actions';
import { BoardsDataService } from '../../../shared/services/boards-data-service/boards-data.service';
import { StorDataService } from './../../../shared/services/stor-service/stor-data.service';

@Injectable()
export class BoardEffect {
  constructor(
    private actions$: Actions,
    private boardData: BoardsDataService,
    private storDataService: StorDataService
  ) {}

  private idBoard = '958f9259-6360-40e7-9655-fe87531d026a'; //берём в общем store?

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

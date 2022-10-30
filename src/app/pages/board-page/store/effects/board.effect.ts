import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { boardFetchAPISuccess, invokeBoardAPI } from '../actions/board.actions';
import { BoardService } from './../../services/board.service';

@Injectable()
export class BoardEffect {
  constructor(private actions$: Actions, private boardService: BoardService) {}

  idBoard = ''; //берём в общем store?

  loadBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeBoardAPI),
      switchMap(() => this.boardService.getBoard(this.idBoard)),
      map((data) => boardFetchAPISuccess({ boardResponse: data }))
    );
  });
}

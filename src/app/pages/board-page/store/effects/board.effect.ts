import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { boardFetchAPISuccess, invokeBoardAPI } from '../actions/board.actions';
import { ApiBoardService } from '../../services/api-board.service';
import { idBoard } from './../state/state';
@Injectable()
export class BoardEffect {
  constructor(
    private actions$: Actions,
    private apiBoardService: ApiBoardService
  ) {}

  loadBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeBoardAPI),
      switchMap(() => this.apiBoardService.getBoard(idBoard)),
      map((data) => boardFetchAPISuccess({ boardResponse: data }))
    );
  });
}

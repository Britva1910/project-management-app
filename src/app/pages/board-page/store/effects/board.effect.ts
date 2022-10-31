import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { boardFetchAPISuccess, invokeBoardAPI } from '../actions/board.actions';
import { ApiBoardService } from '../../services/api-board.service';

@Injectable()
export class BoardEffect {
  constructor(
    private actions$: Actions,
    private apiBoardService: ApiBoardService
  ) {}

  idBoard = '958f9259-6360-40e7-9655-fe87531d026a'; //берём в общем store?

  loadBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeBoardAPI),
      switchMap(() => this.apiBoardService.getBoard(this.idBoard)),
      map((data) => boardFetchAPISuccess({ boardResponse: data }))
    );
  });
}

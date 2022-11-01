import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invokeBoardAPI } from './store/actions/board.actions';
import {
  selectDescriptionBoard,
  selectTitleBoard,
} from './store/selectors/board.selector';
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  constructor(private store: Store) {}

  public title$ = this.store.select(selectTitleBoard);

  public description$ = this.store.select(selectDescriptionBoard);

  public today: number = Date.now();

  ngOnInit(): void {
    this.store.dispatch(invokeBoardAPI());
  }
}

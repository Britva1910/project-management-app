import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invokeBoardAPI } from './store/actions/board.actions';
import { selectTitleBoard } from './store/selectors/board.selector';
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  constructor(private store: Store) {}

  title$ = this.store.select(selectTitleBoard);

  ngOnInit(): void {
    this.store.dispatch(invokeBoardAPI());
  }
}

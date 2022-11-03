import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invokeBoardAPI } from './store/board.actions';
import { CountFiledFormService } from './services/modal-prompt.cervice';
import {
  selectDescriptionBoard,
  selectTitleBoard,
} from './store/board.selector';
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  constructor(
    private store: Store,
    private countFiledFormService: CountFiledFormService
  ) {}

  public title$ = this.store.select(selectTitleBoard);

  public description$ = this.store.select(selectDescriptionBoard);

  public today: number = Date.now();

  ngOnInit(): void {
    this.store.dispatch(invokeBoardAPI());
  }

  public setOneFieldForm() {
    this.countFiledFormService.setOneFiledForm();
  }

  public onAddColumn(event: any) {
    if (event) {
      console.log(event.value);
    }
  }
}

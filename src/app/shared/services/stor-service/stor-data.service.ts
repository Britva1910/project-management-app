import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIdBoard } from './../../store/app.selector';

@Injectable({
  providedIn: 'root',
})
export class StorDataService {
  constructor(private store: Store) {}

  public getIdCurrentBoard(): string {
    let id = '';
    const idBoard = this.store.select(selectIdBoard);
    idBoard.subscribe((data) => (id = data));
    return id;
  }
}

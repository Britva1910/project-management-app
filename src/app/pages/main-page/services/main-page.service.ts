import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';

@Injectable()
export class MainPageService {
  allBoards = new BehaviorSubject<OneBoard[]>([]);

  searchWord = new BehaviorSubject<string>('');

  sortOrder = new BehaviorSubject<string>('Default');

  createModalStatus = new BehaviorSubject<boolean>(false);

  editModalStatus = new BehaviorSubject<boolean>(false);

  deleteModalStatus = new BehaviorSubject<boolean>(false);

  boardId = new BehaviorSubject<string>('');
}

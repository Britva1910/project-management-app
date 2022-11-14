import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MainPageService {
  searchWord = new BehaviorSubject<string>('');

  sortOrder = new BehaviorSubject<string>('Default');

  createModalStatus = new BehaviorSubject<boolean>(false);

  editModalStatus = new BehaviorSubject<boolean>(false);

  deleteModalStatus = new BehaviorSubject<boolean>(false);

  boardId = new BehaviorSubject<string>('');
}

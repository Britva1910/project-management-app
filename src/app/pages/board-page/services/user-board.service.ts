import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Column } from '../../../shared/models/interfaces/interfaces-board';

//this is template service!!! it add mock-response-columns from server
@Injectable()
export class UserBoardService {
  constructor(private http: HttpClient) {}

  private initBoard = [
    {
      id: '9d3b9d80-7bac-4f59-b617-c81f30ccbb48',
      title: 'GitHub-create',
      order: 1,
      tasks: [
        {
          id: '94cb21ee-50e1-4d96-bea8-ff80a48bccd5',
          title: 'Проверка создания и корректирования',
          order: 1,
          description: 'Таск успешно создан и откорректирован',
          userId: 'f7ca6d7d-45bf-45ac-ac75-7f6205982de2',
          files: [],
        },
        {
          id: '878df7fc-5b7a-4a93-95d2-455a3dfc6ed7',
          title: 'new1',
          order: 2,
          description: 'new1',
          userId: 'f7ca6d7d-45bf-45ac-ac75-7f6205982de2',
          files: [],
        },
      ],
    },
    {
      id: 'c6001a3a-d356-4817-b5b6-9502cafb37c1',
      title: 'Hello1',
      order: 2,
      tasks: [
        {
          id: '49988b34-e1bd-4a88-99eb-1802545dd91d',
          title: 'Task:Hello!',
          order: 1,
          description: 'Domestic dog needs to be stroked gently',
          userId: '0d4b6832-2292-495b-866c-60a8970e2b78',
          files: [],
        },
        {
          id: '692b9cd9-f277-47c6-ba93-8216374f9a39',
          title: 'Я НОВАЯ ТАСКА',
          order: 2,
          description: 'Меня только что создали',
          userId: 'f7ca6d7d-45bf-45ac-ac75-7f6205982de2',
          files: [],
        },
      ],
    },
    {
      id: '9144d207-cb50-4818-b561-c91366672bbd',
      title: 'Test2',
      order: 3,
      tasks: [
        {
          id: '323142eb-12d2-4d89-ac1f-68bc978b7fe9',
          title: 'УРА! ',
          order: 1,
          description: 'Колонка перетаскивается!',
          userId: 'f7ca6d7d-45bf-45ac-ac75-7f6205982de2',
          files: [],
        },
      ],
    },
  ];

  private board$ = new BehaviorSubject<Column[]>(this.initBoard);

  public getBoard$(): Observable<Column[]> {
    return this.board$.asObservable();
  }
}

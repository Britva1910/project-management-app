import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
//import { State } from '../store/state/state';
import { Column } from './../models/interfaces';

@Injectable()
export class UserBoardService {
  constructor(private http: HttpClient) {}

  private initBoard = [
    {
      id: '755e6470-a633-4fae-9e47-cf6680b75097',
      title: 'Вторник',
      order: 3,
      tasks: [
        {
          id: '43bc666f-6655-41bf-8b2a-36ea592bcbaa',
          title: 'Task: pet the cat',
          order: 1,
          description: 'Domestic cat needs to be stroked gently',
          userId: '0d4b6832-2292-495b-866c-60a8970e2b78',
          files: [],
        },
        {
          id: '64b29ad9-c0d9-445a-9d83-5c9f7e6a6616',
          title: 'Task:HELLO',
          order: 2,
          description: 'YTKKJ',
          userId: '0d4b6832-2292-495b-866c-60a8970e2b78',
          files: [],
        },
        {
          id: 'f86f30c2-6969-4cfb-9be1-b65847598919',
          title: 'OK',
          order: 3,
          description: 'OOOOOoooooottttttvvvet',
          userId: '0d4b6832-2292-495b-866c-60a8970e2b78',
          files: [],
        },
      ],
    },
    {
      id: '05235356-6f27-4242-8e8f-93b440c2acfe',
      title: 'Понедельник',
      order: 2,
      tasks: [],
    },
    {
      id: 'e1e7fdca-3dd6-4cf0-81fd-797b63537848',
      title: 'My Work',
      order: 1,
      tasks: [],
    },
  ];

  private board$ = new BehaviorSubject<Column[]>(this.initBoard);

  public getBoard$(): Observable<Column[]> {
    return this.board$.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
//import { State } from '../store/state/state';

@Injectable()
export class UserBoardService {
  constructor(private http: HttpClient) {}

  private initBoard = [
    {
      id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
      title: 'Done',
      order: 1,
      tasks: [
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          title: 'Task: pet the cat',
          order: 1,
          description: 'Domestic cat needs to be stroked gently',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
      ],
    },
  ];

  private board = this.initBoard;

  private board$ = new BehaviorSubject<any[]>(this.initBoard);

  public getBoard$(): Observable<any[]> {
    return this.board$.asObservable();
  }
}

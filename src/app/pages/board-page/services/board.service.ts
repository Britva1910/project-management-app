import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from './../models/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class BoardService {
  constructor(private http: HttpClient) {}

  public getBoard(id: string): Observable<State[]> {
    return this.http.get<State[]>(`boards/${id}`);
  }
}

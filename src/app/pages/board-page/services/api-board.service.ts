import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { State } from '../store/state/state';

@Injectable()
export class ApiBoardService {
  constructor(private http: HttpClient) {}

  public getBoard(id: string): Observable<State> {
    return this.http.get<State>(`boards/${id}`);
  }
}

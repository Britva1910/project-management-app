import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { BASE_URL } from '../../constant/url';
import { Observable } from 'rxjs';
import { State } from '../../../pages/board-page/store/state/state';

@Injectable({
  providedIn: 'root',
})
export class BoardsDataService {
  private readonly baseURL: string;

  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {
    this.baseURL = BASE_URL;
  }

  public getBoardById(id: string): Observable<State> {
    const url = 'boards' + `/${id}`;
    return this.RequestClientBuilder.get<State>(url);
  }
}

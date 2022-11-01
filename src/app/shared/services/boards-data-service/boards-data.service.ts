import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { State } from '../../../pages/board-page/store/state/state';
import { UrlsEnum } from '../../models/enums/urls-enum';

@Injectable({
  providedIn: 'root',
})
export class BoardsDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllBoards(): Observable<State> {
    return this.RequestClientBuilder.get<State>(UrlsEnum.boards);
  }

  public getBoardById(id: string): Observable<State> {
    const url = `${UrlsEnum.boards}/${id}`;
    return this.RequestClientBuilder.get<State>(url);
  }

  public createBoard(data: unknown): Observable<unknown> {
    return this.RequestClientBuilder.post(UrlsEnum.boards, data);
  }

  public deleteBoard(id: string): Observable<unknown> {
    const url = `${UrlsEnum.boards}/${id}`;
    return this.RequestClientBuilder.delete(url);
  }

  public updateBoard(id: string, data: unknown): Observable<unknown> {
    const url = `${UrlsEnum.boards}/${id}`;
    return this.RequestClientBuilder.put(url, data);
  }
}

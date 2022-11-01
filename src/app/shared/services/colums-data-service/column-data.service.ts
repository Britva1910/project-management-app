import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';

@Injectable({
  providedIn: 'root',
})
export class ColumnDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllColumns(boardId: string): Observable<unknown> {
    const url = UrlsEnum.boards + `/${boardId}` + UrlsEnum.columns;
    return this.RequestClientBuilder.get<unknown>(url);
  }

  public createColumn(boardId: string, data: unknown): Observable<unknown> {
    const url = UrlsEnum.boards + `/${boardId}` + UrlsEnum.columns;
    return this.RequestClientBuilder.post(url, data);
  }

  public getColumnById(boardId: string, columnId: string): Observable<unknown> {
    const url =
      UrlsEnum.boards + `/${boardId}` + UrlsEnum.columns + `/${columnId}`;
    return this.RequestClientBuilder.get<unknown>(url);
  }

  public deleteColumn(boardId: string, columnId: string): Observable<unknown> {
    const url =
      UrlsEnum.boards + `/${boardId}` + UrlsEnum.columns + `/${columnId}`;
    return this.RequestClientBuilder.delete(url);
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    data: unknown
  ): Observable<unknown> {
    const url =
      UrlsEnum.boards + `/${boardId}` + UrlsEnum.columns + `/${columnId}`;
    return this.RequestClientBuilder.put(url, data);
  }
}

import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';

@Injectable({
  providedIn: 'root',
})
export class TasksDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllTasks(boardId: string, columnId: string): Observable<unknown> {
    const url =
      UrlsEnum.boards +
      `/${boardId}` +
      UrlsEnum.columns +
      `/${columnId}` +
      UrlsEnum.tasks;
    return this.RequestClientBuilder.get<unknown>(url);
  }

  public createTask(
    boardId: string,
    columnId: string,
    data: unknown
  ): Observable<unknown> {
    const url =
      UrlsEnum.boards +
      `/${boardId}` +
      UrlsEnum.columns +
      `/${columnId}` +
      UrlsEnum.tasks;
    return this.RequestClientBuilder.post(url, data);
  }

  public getTaskById(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<unknown> {
    const url =
      UrlsEnum.boards +
      `/${boardId}` +
      UrlsEnum.columns +
      `/${columnId}` +
      UrlsEnum.tasks +
      `/${taskId}`;
    return this.RequestClientBuilder.get<unknown>(url);
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<unknown> {
    const url =
      UrlsEnum.boards +
      `/${boardId}` +
      UrlsEnum.columns +
      `/${columnId}` +
      UrlsEnum.tasks +
      `/${taskId}`;
    return this.RequestClientBuilder.delete(url);
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    data: unknown
  ): Observable<unknown> {
    const url =
      UrlsEnum.boards +
      `/${boardId}` +
      UrlsEnum.columns +
      `/${columnId}` +
      UrlsEnum.tasks +
      `/${taskId}`;
    return this.RequestClientBuilder.put(url, data);
  }
}

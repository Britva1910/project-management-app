import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public getAllUsers(): Observable<unknown> {
    return this.RequestClientBuilder.get<unknown>(UrlsEnum.users);
  }

  public getBoardById(id: string): Observable<unknown> {
    const url = `${UrlsEnum.users}/${id}`;
    return this.RequestClientBuilder.get<unknown>(url);
  }

  public deleteUser(id: string): Observable<unknown> {
    const url = `${UrlsEnum.users}/${id}`;
    return this.RequestClientBuilder.delete(url);
  }

  public updateUser(id: string, data: unknown): Observable<unknown> {
    const url = `${UrlsEnum.boards}/${id}`;
    return this.RequestClientBuilder.put(url, data);
  }
}

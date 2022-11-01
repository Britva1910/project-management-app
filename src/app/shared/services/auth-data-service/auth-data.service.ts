import { Injectable } from '@angular/core';
import { RequestClientBuilderService } from '../request-client-builder/request-client-builder.service';
import { Observable } from 'rxjs';
import { UrlsEnum } from '../../models/enums/urls-enum';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(
    private readonly RequestClientBuilder: RequestClientBuilderService
  ) {}

  public logIn(data: unknown): Observable<unknown> {
    return this.RequestClientBuilder.post(UrlsEnum.logIn, data);
  }

  public signUp(data: unknown): Observable<unknown> {
    return this.RequestClientBuilder.post(UrlsEnum.signUp, data);
  }
}

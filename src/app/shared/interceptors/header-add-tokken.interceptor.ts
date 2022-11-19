import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './../services/local-storage-service/local-storage.service';

@Injectable()
export class HeaderAddTokkenInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokken: string | null =
      this.localStorageService.getFromLocalStorage('token');
    if (tokken) {
      return next.handle(
        request.clone({
          headers: request.headers.set('Authorization', `Bearer ${tokken}`),
        })
      );
    } else {
      return next.handle(request);
    }
  }
}

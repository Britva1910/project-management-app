import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderAddTokkenInterceptor implements HttpInterceptor {
  tokken: string | null = localStorage.getItem('TOKEN');

  isTokken: boolean = true;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isTokken) {
      return next.handle(
        request.clone({
          headers: request.headers.set(
            'Authorization',
            `Bearer ${this.tokken}`
          ),
        })
      );
    } else {
      return next.handle(request);
    }
  }
}

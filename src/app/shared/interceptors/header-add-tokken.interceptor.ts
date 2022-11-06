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
  tokken: string | null =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmN2NhNmQ3ZC00NWJmLTQ1YWMtYWM3NS03ZjYyMDU5ODJkZTIiLCJsb2dpbiI6IlNtUyIsImlhdCI6MTY2NzcyNTU4Mn0.RlZMtUPT8Lsw2mAEciR2lJsR6OKF6DK8z5oHmMgBlGE';

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

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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMzk3MzFlMy0zZDhmLTQ1OGMtYjVmMi1lZmNjYTI3MmRlNzciLCJsb2dpbiI6InVzZXIwMDE3IiwiaWF0IjoxNjY2OTkxODYwfQ.HXxnT-2EdjuriLr82_uUK8M7m-5V8RTwNBDgpDtsCJM';

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

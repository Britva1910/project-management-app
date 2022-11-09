import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../pages/auth-page/services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.loginService.isLogin().then((isLogin) => {
        if (isLogin) {
          resolve(true);
        } else {
          this.router.navigate(['/auth/login'], {
            queryParams: {
              auth: false,
            },
          });
          resolve(false);
        }
      });
    });
  }
}

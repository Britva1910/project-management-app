import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';
import { LoginData, Token } from '../../../shared/models/auth-models';
import {
  setIsLogin,
  setToken,
  setUserData,
} from '../../../shared/store/app.action';
import { AuthDataService } from '../../../shared/services/auth-data-service/auth-data.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private store: Store,
    private router: Router,
    private userDataService: UserDataService,
    private localStorageService: LocalStorageService,
    private authDataService: AuthDataService,
    private notificationService: NotificationService
  ) {}

  checkUserStatus(): Observable<boolean> {
    const token = this.getTokenFromLocalStorage();
    if (!token) {
      console.log('no token');
      return of(false);
    } else {
      const userId = this.getUserIdFromToken(token);
      return this.userDataService.getUserById(userId).pipe(
        catchError(async (err) => console.log(err)),
        map((value) => {
          this.store.dispatch(setToken({ token: token }));
          return value ? true : false;
        })
      );
    }
  }

  logIn(userData: LoginData) {
    this.authDataService.logIn(userData).subscribe({
      next: (data: Token) => {
        const userId = this.getUserIdFromToken(data.token);
        this.localStorageService.saveInLocalStorage('token', data.token);
        this.localStorageService.saveInLocalStorage('userId', userId);
        this.store.dispatch(
          setUserData({
            token: data.token,
            userId: userId,
            userLogin: '',
            userName: '',
          })
        );
        this.store.dispatch(setIsLogin({ isLogin: true }));
        console.log(this.localStorageService.getFromLocalStorage('token'));
        if (this.localStorageService.getFromLocalStorage('token')) {
          this.router.navigate(['/main']);
        }
      },
      error: (error) => {
        if (error.statusText === 'Forbidden') {
          this.notificationService.showError('errorHandling.loginError');
        }
      },
    });
  }

  /*

  isLogin(): Promise<boolean> {


    const userId = this.getUserIdFromToken(token);
    const response = this.userDataService.getUserById(userId);
    return new Promise((resolve) => {
      response.subscribe({
        next: (userData) => {
          this.store.dispatch(
            setUserData({
              token: token,
              userId: userId,
              userLogin: userData.login,
              userName: userData.name,
            })
          );
          resolve(true);
        },
        error: (error) => {
          resolve(false);
          if (error) {
            if (error.statusText === 'Unauthorized') {
              this.notificationService.showError('errorHandling.bug');
            }
          }
        },
      });
    });
  }

  logIn(userData: LoginData) {
    this.authDataService.logIn(userData).subscribe({
      next: (data: Token) => {
        const userId = this.getUserIdFromToken(data.token);
        this.localStorageService.saveInLocalStorage('token', data.token);
        this.localStorageService.saveInLocalStorage('userId', userId);
        this.store.dispatch(
          setUserData({
            token: data.token,
            userId: userId,
            userLogin: '',
            userName: '',
          })
        );
        this.router.navigate(['/main']);
      },
      error: (error) => {
        if (error.statusText === 'Forbidden') {
          this.notificationService.showError('errorHandling.loginError');
        }
      },
    });
  }
*/

  singUp(userData: LoginData) {
    this.logIn(userData);
  }

  logOut() {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['/welcome']);
  }

  getTokenFromLocalStorage(): string | null {
    const tokenFromLocalStorage =
      this.localStorageService.getFromLocalStorage('token');
    if (typeof tokenFromLocalStorage === 'string') {
      return tokenFromLocalStorage;
    }
    return null;
  }

  getUserIdFromToken(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((item) => {
          return '%' + ('00' + item.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload).userId;
  }
}

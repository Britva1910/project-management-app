import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';
import { LoginData, Token } from '../../../shared/models/auth-models';
import { setUserData } from '../../../shared/store/app.action';
import { AuthDataService } from '../../../shared/services/auth-data-service/auth-data.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private store: Store,
    private router: Router,
    private userDataService: UserDataService,
    private localStorageService: LocalStorageService,
    private authDataService: AuthDataService
  ) {}

  isLogin(): Promise<boolean> {
    const token = this.getTokenFromLocalStorage();
    //const token = //this is expires token for testing
    //('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMzk3MzFlMy0zZDhmLTQ1OGMtYjVmMi1lZmNjYTI3MmRlNzciLCJsb2dpbiI6InVzZXIwMDE3IiwiaWF0IjoxNjY2OTkxODYwfQ.HXxnT-2EdjuriLr82_uUK8M7m-5V8RTwNBDgpDtsCJM');
    if (!token) {
      return new Promise((resolve) => resolve(false));
    }
    const userId = this.getUserIdFromToken(token);
    const response = this.userDataService.getUserById(userId);
    return new Promise((resolve) => {
      response.subscribe({
        next: () => {
          resolve(true);
        },
        error: () => {
          resolve(false);
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
        this.store.dispatch(setUserData({ token: data.token, userId: userId }));
        this.router.navigate(['/main']);
      },
      error: (error) => console.log(`Error - ${error.error}`),
    });
  }

  singUp(userData: LoginData) {
    this.logIn(userData);
  }

  logOut() {
    this.localStorageService.remoteFromLocalStorage('token');
    this.localStorageService.remoteFromLocalStorage('userId');
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

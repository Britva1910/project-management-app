import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private userDataService: UserDataService,
    private localStorageService: LocalStorageService
  ) {}

  isLogin(): boolean {
    const token = this.getTokenFromLocalStorage();
    //const token = //this is expires token for testing
    //('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMzk3MzFlMy0zZDhmLTQ1OGMtYjVmMi1lZmNjYTI3MmRlNzciLCJsb2dpbiI6InVzZXIwMDE3IiwiaWF0IjoxNjY2OTkxODYwfQ.HXxnT-2EdjuriLr82_uUK8M7m-5V8RTwNBDgpDtsCJM');
    if (token) {
      const userId = this.getUserIdFromToken(token);
      const response = this.userDataService.getUserById(userId);

      response.subscribe({
        next: () => {
          return true;
        },
        error: () => {
          return false;
        },
      });
    }
    return true;
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

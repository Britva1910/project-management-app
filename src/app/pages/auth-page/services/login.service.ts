import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tabs } from '../models/tabs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public authActiveTub$ = new Subject<Tabs>();

  onLoginTab(): void {
    this.authActiveTub$.next(Tabs.Login);
  }

  onSingUpTab(): void {
    this.authActiveTub$.next(Tabs.SignUp);
  }
}

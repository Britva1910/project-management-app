import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../../../shared/services/auth-data-service/auth-data.service';
import { Store } from '@ngrx/store';
import { setUserData } from '../../../../shared/store/app.action';
import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../../../shared/services/local-storage-service/local-storage.service';
import { Token } from '../../../../shared/models/auth-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  form = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private store: Store,
    private authDataService: AuthDataService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    console.log('onSubmit');
    const userData = {
      login: this.form.value.login?.trim(),
      password: this.form.value.password,
    };
    //take out the logic below in service

    this.authDataService.logIn(userData).subscribe({
      next: (data: Token) => {
        //this.store.dispatch(setUserToken(data));
        const userId = this.loginService.getUserIdFromToken(data.token);
        this.localStorageService.saveInLocalStorage('token', data.token);
        this.localStorageService.saveInLocalStorage('userId', userId);
        this.store.dispatch(setUserData({ token: data.token, userId: userId }));
      },
      error: (error) => console.log(`Error - ${error.error}`),
    });
  }
}

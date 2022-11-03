import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../../../shared/services/auth-data-service/auth-data.service';
import { Store } from '@ngrx/store';
import { setUserId, setUserToken } from '../../../../shared/store/app.action';
import { LoginService } from '../../services/login.service';
import { LocalStorageService } from '../../../../shared/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store,
    private authDataService: AuthDataService,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}

  onSubmit() {
    const userData = {
      login: this.form.value.login,
      password: this.form.value.password,
    };
    this.authDataService.logIn(userData).subscribe({
      next: (data: any) => {
        this.store.dispatch(setUserToken(data));
        this.loginService.getUserId(userData.login).subscribe((id) => {
          this.store.dispatch(setUserId({ userId: id }));
          this.localStorageService.saveInLocalStorage('userId', id);
        });
        this.localStorageService.saveInLocalStorage('token', data.token);
      },
      error: (error) => console.log(`Error - ${error.error.message}`),
    });
  }
}

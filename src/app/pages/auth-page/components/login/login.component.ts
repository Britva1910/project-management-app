import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../../../shared/services/auth-data-service/auth-data.service';
import { Store } from '@ngrx/store';
import { setUserToken } from '../../../../shared/store/app.action';

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

  constructor(private store: Store, private authDataService: AuthDataService) {}

  onSubmit() {
    const userData = {
      login: this.form.value.login,
      password: this.form.value.password,
    };
    this.authDataService.logIn(userData).subscribe((data) => {
      console.log(data);
      this.store.dispatch(setUserToken(data));
    });
  }
}

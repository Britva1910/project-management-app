import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../../../shared/services/auth-data-service/auth-data.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent {
  hide = true;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private authDataService: AuthDataService,
    private loginService: LoginService
  ) {}

  get name() {
    return this.form.get('name');
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const userDataForm = {
      name: this.form.value.name,
      login: this.form.value.login,
      password: this.form.value.password,
    };
    this.authDataService.signUp(userDataForm).subscribe({
      next: () => {
        const userData = {
          login: this.form.value.login,
          password: this.form.value.password,
        };
        this.loginService.logIn(userData);
      },
      error: (err) => {
        console.log('SingUp error' + err.message);
      },
    });
  }
}

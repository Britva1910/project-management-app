import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../../../shared/services/auth-data-service/auth-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authDataService: AuthDataService,
    private router: Router
  ) {}

  onSubmit() {
    console.log(this.form.value);
    this.authDataService.signUp(this.form.value).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/auth/login']);
    });
  }
}

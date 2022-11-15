import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditProfileService } from '../../../pages/welcome-page/services/edit-profile.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  public currentUserData = {
    userName: '',
    userLogin: '',
    userPassword: '',
  };

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private editProfile: EditProfileService) {}

  ngOnInit() {
    this.sub = this.editProfile.getCurrentUserData().subscribe((data) => {
      this.currentUserData.userName = data.userName;
      this.currentUserData.userLogin = data.userLogin;
      this.name?.setValue(data.userName);
      this.login?.setValue(data.userLogin);
    });
  }

  get name() {
    return this.form.get('name');
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  prevStep() {
    console.log('1');
  }

  nextStep() {
    console.log('2');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

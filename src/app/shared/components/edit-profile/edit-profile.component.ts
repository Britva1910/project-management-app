import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditProfileService } from '../../../pages/welcome-page/services/edit-profile.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  public currentUserData = {
    name: '',
    login: '',
    password: '',
  };

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private editProfile: EditProfileService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.sub = this.editProfile.getCurrentUserData().subscribe((data) => {
      this.currentUserData.name = data.userName;
      this.currentUserData.login = data.userLogin;

      const userPassword = this.localStorage.getFromLocalStorage('password');

      if (userPassword === 'string') {
        this.currentUserData.password = userPassword;
      }

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

  changeUserName() {
    const newUserData = Object.assign(this.currentUserData);

    newUserData.name = this.form.value.name;

    this.editProfile
      .changeUserData(newUserData)
      .subscribe((response) => (this.currentUserData.name = response.name));
  }

  changeUserLogin() {
    const newUserData = Object.assign(this.currentUserData);

    newUserData.login = this.form.value.login;

    this.editProfile
      .changeUserData(newUserData)
      .subscribe((response) => (this.currentUserData.login = response.login));
  }

  changeUserPassword() {
    const newUserData = Object.assign(this.currentUserData);

    newUserData.password = this.form.value.password;

    this.editProfile.changeUserData(newUserData).subscribe();
  }

  deleteUser(event: any) {
    if (event.clicked) {
      this.editProfile.deleteUser();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

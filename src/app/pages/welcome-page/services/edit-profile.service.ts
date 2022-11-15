import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { CurrentUserData } from '../../../shared/models/interfaces/edit-profile';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from '../../../shared/store/app.selector';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';
import { UpdateUserRequestBody } from '../../../shared/models/interfaces/interfaces-board';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  currentUserId: string;

  constructor(
    private store: Store,
    private userDataService: UserDataService,
    private localStorage: LocalStorageService
  ) {
    this.currentUserId = this.localStorage
      .getFromLocalStorage('userId')
      .toString();
  }

  getCurrentUserData(): Observable<CurrentUserData> {
    return this.store.select(selectUserData);
  }

  changeUserData(newUserData: UpdateUserRequestBody) {
    return this.userDataService.updateUser(this.currentUserId, newUserData);
  }
}

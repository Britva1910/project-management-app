import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { CurrentUserData } from '../../../shared/models/interfaces/edit-profile';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from '../../../shared/store/app.selector';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(private store: Store, private userDataService: UserDataService) {}

  getCurrentUserData(): Observable<CurrentUserData> {
    return this.store.select(selectUserData);
  }
}

import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private userDataService: UserDataService) {}

  getUserId(userName: string | null | undefined) {
    return this.userDataService.getAllUsers().pipe(
      map((response) => {
        return response.filter((item) =>
          item.name === userName ? item : null
        );
      }),
      map((data) => data[0].id)
    );
  }
}

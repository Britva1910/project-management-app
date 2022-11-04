import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CountFiledFormService {
  private oneFiledForm$ = new BehaviorSubject<boolean>(false);

  public isOneFiledForm(): boolean {
    return this.oneFiledForm$.getValue();
  }

  public setOneFiledForm() {
    this.oneFiledForm$.next(true);
  }

  public setTwoFiledForm() {
    this.oneFiledForm$.next(false);
  }
}

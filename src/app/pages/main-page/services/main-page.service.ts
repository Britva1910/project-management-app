import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  searchWord = new BehaviorSubject<string>('');

  sortOrder = new BehaviorSubject<string>('Default');
}

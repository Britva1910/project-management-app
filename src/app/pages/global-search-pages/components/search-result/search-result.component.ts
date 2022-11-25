import { Component, OnInit } from '@angular/core';
import { BoardAndAllTasks } from 'src/app/shared/models/interfaces/interfaces-board';
import { SearchService } from './../../services/search.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './../../../../shared/services/local-storage-service/local-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { setCurrentBoard } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  public searchText: string;

  public boardAndAllTasks: Observable<BoardAndAllTasks[]> =
    this.searchService.getNewArrAllBoards$();

  constructor(
    private searchService: SearchService,
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.searchService
      .getValueInputFilter()
      .subscribe((value) => (this.searchText = value));
  }

  public saveIdCurrentBoard(id: string) {
    this.localStorageService.saveInLocalStorage('currentBoard', id);
    this.store.dispatch(setCurrentBoard({ id }));
    this.router.navigate(['board', id]);
    this.spinnerService.show();
  }
}

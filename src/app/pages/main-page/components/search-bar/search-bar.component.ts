import { Component } from '@angular/core';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchText = '';

  constructor(private mainPageService: MainPageService) {}

  search() {
    this.mainPageService.searchWord.next(this.searchText);
  }

  searchByEnter(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.search();
    }
  }
}

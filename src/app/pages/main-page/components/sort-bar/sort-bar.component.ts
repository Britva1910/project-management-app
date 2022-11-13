import { Component, OnInit } from '@angular/core';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss'],
})
export class SortBarComponent implements OnInit {
  sortOrder: string;

  rotateIcon: boolean;

  constructor(private mainPageService: MainPageService) {}

  ngOnInit() {
    this.mainPageService.sortOrder.subscribe((data) => (this.sortOrder = data));
  }

  sort() {
    if (this.sortOrder === 'Default') {
      this.mainPageService.sortOrder.next('A-Z');
      this.rotateIcon = false;
    } else if (this.sortOrder === 'A-Z') {
      this.mainPageService.sortOrder.next('Z-A');
      this.rotateIcon = true;
    } else if (this.sortOrder === 'Z-A') {
      this.mainPageService.sortOrder.next('A-Z');
      this.rotateIcon = false;
    }
  }
}

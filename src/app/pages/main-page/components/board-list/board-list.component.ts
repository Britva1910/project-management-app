import { Component, OnInit } from '@angular/core';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  boards: OneBoard[];

  searchText: string;

  sortOrder: string;

  isCreateModalOpened: boolean;

  isEditModalOpened: boolean;

  constructor(
    private boardDataService: BoardsDataService,
    private mainPageService: MainPageService
  ) {}

  ngOnInit() {
    this.boardDataService.getAllBoards().subscribe({
      next: (data: OneBoard[]) => {
        this.boards = data;
      },
    });

    this.mainPageService.searchWord.subscribe(
      (data) => (this.searchText = data)
    );

    this.mainPageService.sortOrder.subscribe((data) => (this.sortOrder = data));

    this.mainPageService.createModalStatus.subscribe(
      (data) => (this.isCreateModalOpened = data)
    );

    this.mainPageService.editModalStatus.subscribe(
      (data) => (this.isEditModalOpened = data)
    );
  }

  createNewBoard() {
    this.mainPageService.createModalStatus.next(true);
  }

  sendBoardId(event: MouseEvent, id: string) {
    const target = event.target as HTMLElement;
    if (target.textContent === 'delete') {
      console.log('delete');
    } else if (target.textContent === 'edit') {
      this.mainPageService.editModalStatus.next(true);
    } else {
      this.mainPageService.boardId.next(id);
    }
  }
}

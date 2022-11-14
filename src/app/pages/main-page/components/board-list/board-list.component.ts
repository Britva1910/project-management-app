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

  isDeleteModalOpened: boolean;

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

    this.mainPageService.deleteModalStatus.subscribe(
      (data) => (this.isDeleteModalOpened = data)
    );
  }

  createNewBoard() {
    this.mainPageService.createModalStatus.next(true);
  }

  sendBoardId(event: MouseEvent, id: string) {
    const target = event.target as HTMLElement;
    this.mainPageService.boardId.next(id);
    if (target.textContent === 'delete') {
      this.mainPageService.deleteModalStatus.next(true);
    } else if (target.textContent === 'edit') {
      this.mainPageService.editModalStatus.next(true);
    }
  }
}

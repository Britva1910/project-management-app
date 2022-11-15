import { Component, OnInit } from '@angular/core';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { MainPageService } from '../../../services/main-page.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  id: string;

  constructor(
    private boardsDataService: BoardsDataService,
    private mainPageService: MainPageService
  ) {}

  ngOnInit() {
    this.mainPageService.boardId.subscribe((data) => (this.id = data));
  }

  remove() {
    this.boardsDataService.deleteBoard(this.id).subscribe();
    this.boardsDataService.getAllBoards().subscribe({
      next: (item: OneBoard[]) => {
        this.mainPageService.allBoards.next(item);
      },
    });
    this.cancel();
  }

  cancel() {
    this.mainPageService.deleteModalStatus.next(false);
  }
}

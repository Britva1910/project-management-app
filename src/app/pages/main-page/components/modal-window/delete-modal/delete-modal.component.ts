import { Component, OnInit } from '@angular/core';
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
    console.log(this.id);
  }

  remove() {
    this.boardsDataService.deleteBoard(this.id);
    this.cancel();
  }

  cancel() {
    this.mainPageService.deleteModalStatus.next(false);
  }
}

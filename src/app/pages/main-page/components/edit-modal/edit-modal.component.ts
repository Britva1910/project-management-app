import { Component, OnInit } from '@angular/core';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { MainPageService } from '../../services/main-page.service';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public title: string;

  public description: string;

  public id: string;

  constructor(
    private boardsDataService: BoardsDataService,
    private mainPageService: MainPageService
  ) {}

  ngOnInit() {
    this.mainPageService.boardId.subscribe((data) => (this.id = data));

    this.mainPageService.getAllBoards$().subscribe((data) => {
      const form = data.filter((item) => this.id === item.id);
      this.title = form[0].title;
      this.description = form[0].description;
    });
  }

  public edit() {
    this.boardsDataService
      .updateBoard(this.id, {
        title: this.title,
        description: this.description,
      })
      .subscribe((item) => {
        if (item) {
          this.boardsDataService.getAllBoards().subscribe({
            next: (data: OneBoard[]) => {
              this.mainPageService.setAllBoards$(data);
            },
          });
        }
      });
    this.cancel();
  }

  public cancel() {
    this.mainPageService.editModalStatus.next(false);
  }
}

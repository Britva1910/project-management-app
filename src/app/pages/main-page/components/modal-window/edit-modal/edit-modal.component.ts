import { Component, OnInit } from '@angular/core';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { MainPageService } from '../../../services/main-page.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  editForm: FormGroup;

  id: string;

  constructor(
    private boardsDataService: BoardsDataService,
    private mainPageService: MainPageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.mainPageService.boardId.subscribe((data) => (this.id = data));
  }

  edit() {
    this.boardsDataService
      .updateBoard(this.id, this.editForm.value)
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

  cancel() {
    this.mainPageService.editModalStatus.next(false);
  }
}

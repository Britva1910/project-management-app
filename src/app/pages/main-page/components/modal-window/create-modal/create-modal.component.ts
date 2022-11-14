import { Component, OnInit } from '@angular/core';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { MainPageService } from '../../../services/main-page.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
  createForm: FormGroup;

  boards: OneBoard[] = [];

  constructor(
    private boardsDataService: BoardsDataService,
    private mainPageService: MainPageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.mainPageService.allBoards.subscribe((data) => (this.boards = data));
  }

  create() {
    this.boardsDataService
      .createBoard(this.createForm.value)
      .subscribe((data) => {
        this.boards.push(data);
        this.mainPageService.allBoards.next(this.boards);
      });
    this.cancel();
  }

  cancel() {
    this.mainPageService.createModalStatus.next(false);
  }
}

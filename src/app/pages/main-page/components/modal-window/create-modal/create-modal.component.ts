import { Component, OnInit } from '@angular/core';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { MainPageService } from '../../../services/main-page.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
  createForm: FormGroup;

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
  }

  create() {
    this.boardsDataService.createBoard(this.createForm.value);
    this.cancel();
  }

  cancel() {
    this.mainPageService.createModalStatus.next(false);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tasks } from '../../../../shared/models/interfaces/interfaces-board';
import { ModalConfirmService } from './../../../../shared/services/modal-confirm-service/modal-confirm.service';
import { BoardsDataService } from './../../../../shared/services/boards-data-service/boards-data.service';
//import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
})
export class ItemBoardComponent {
  constructor(
    private modalConfirmService: ModalConfirmService,
    private boardsDataService: BoardsDataService
  ) {}

  public data = 'Delete task?';

  @Input() item!: Tasks;

  @Output() emitDeleteTask: EventEmitter<string> = new EventEmitter();

  @Output() emitEditTask: EventEmitter<string> = new EventEmitter();

  public deleteOneTask(event: any, idTask: string) {
    if (event.clicked) {
      this.emitDeleteTask.emit(idTask);
    }
  }

  public editTask(idTask: string) {
    this.emitEditTask.emit(idTask);
  }
  /* TEMPLATE FUNCTION FOR Blob File
  public binaryToString = (binary = '') => {
    let strArr = binary.split(' ');
    const str = strArr
      .map((part) => {
        return String.fromCharCode(parseInt(part, 2));
      })
      .join('');
    return str;
  };

  public down(idTask: string, fileName: string) {
    this.boardsDataService.douwn(idTask, fileName).subscribe({
      next: (response) => {
        return URL.createObjectURL(response.blob());
      },
      error: (error: HttpErrorResponse) =>
        console.log(`Error - ${error.error.message}`),
    });
  }
  */
}

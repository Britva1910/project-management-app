import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tasks } from '../../../../shared/models/interfaces/interfaces-board';
import { ModalConfirmService } from './../../../../shared/services/modal-confirm-service/modal-confirm.service';
@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
})
export class ItemBoardComponent {
  constructor(private modalConfirmService: ModalConfirmService) {}

  data = 'Delete task?';

  @Input() item!: Tasks;

  @Output() emitDeleteTask: EventEmitter<string> = new EventEmitter();

  deleteOneTask(event: any, idTask: string) {
    if (event.clicked) {
      this.emitDeleteTask.emit(idTask);
    }
  }
}

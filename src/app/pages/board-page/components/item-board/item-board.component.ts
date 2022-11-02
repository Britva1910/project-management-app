import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tasks } from '../../models/interfaces';
import { ModalConfirmService } from './../../../../shared/services/modal-confirm-service/modal-confirm.service';
@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
})
export class ItemBoardComponent {
  constructor(private modalConfirmService: ModalConfirmService) {}

  @Input() item!: Tasks;

  @Output() emitDeleteTask: EventEmitter<string> = new EventEmitter();

  deleteOneTask(idTask: string) {
    this.modalConfirmService.setShowModalConfirm();
    this.emitDeleteTask.emit(idTask);
  }
}

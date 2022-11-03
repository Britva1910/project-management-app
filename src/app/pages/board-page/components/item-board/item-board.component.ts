import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tasks } from '../../../../shared/models/interfaces/interfaces-board';

@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
})
export class ItemBoardComponent {
  @Input() item!: Tasks;

  @Output() emitDeleteTask: EventEmitter<string> = new EventEmitter();

  @Output() emitUpdateTask: EventEmitter<string> = new EventEmitter();

  deleteOneTask(idTask: string) {
    this.emitDeleteTask.emit(idTask);
  }

  updateTask(idTask: string) {
    this.emitUpdateTask.emit(idTask);
  }
}

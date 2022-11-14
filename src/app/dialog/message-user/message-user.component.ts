import { Component, Input } from '@angular/core';
import { ModalService } from './../service/modal-prompt.service';

@Component({
  selector: 'app-message-user',
  templateUrl: './message-user.component.html',
  styleUrls: ['./message-user.component.scss'],
})
export class MessageUserComponent {
  constructor(private modalService: ModalService) {}

  @Input() title: string;

  public showModal$ = this.modalService.getIsShowModal$();

  public close() {
    this.modalService.closeEditModal$();
  }
}

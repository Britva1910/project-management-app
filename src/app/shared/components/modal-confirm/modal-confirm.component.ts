import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent {
  public showModal = true;

  public cancel() {
    this.showModal = false;
  }

  public confirm() {
    this.showModal = false;
  }
}

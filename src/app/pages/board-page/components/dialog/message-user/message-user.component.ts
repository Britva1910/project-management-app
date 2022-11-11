import { Component, Input } from '@angular/core';
import { UserBoardService } from './../../../services/user-board.service';

@Component({
  selector: 'app-message-user',
  templateUrl: './message-user.component.html',
  styleUrls: ['./message-user.component.scss'],
})
export class MessageUserComponent {
  constructor(private userBoardService: UserBoardService) {}

  @Input() title: string;

  public showModal$ = this.userBoardService.getIsShowModal$();

  public close() {
    this.userBoardService.closeEditModal$();
  }
}

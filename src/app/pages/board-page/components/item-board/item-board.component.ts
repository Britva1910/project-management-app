import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tasks } from '../../../../shared/models/interfaces/interfaces-board';
import { LocalStorageService } from './../../../../shared/services/local-storage-service/local-storage.service';
import { UserBoardService } from './../../services/user-board.service';
import { colorGrey } from 'src/app/shared/constant/color';

@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
})
export class ItemBoardComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private userBoardService: UserBoardService
  ) {}

  public data = 'Delete task?';

  @Input() item!: Tasks;

  @Output() emitDeleteTask: EventEmitter<string> = new EventEmitter();

  @Output() emitEditTask: EventEmitter<string> = new EventEmitter();

  public deleteOneTask(event: any, idTask: string, userIdTask: string) {
    if (event.clicked) {
      const userId: string = this.localStorageService
        .getFromLocalStorage('userId')
        .toString();
      if (userId === userIdTask) {
        this.emitDeleteTask.emit(idTask);
      } else {
        this.userBoardService.openEditModal$();
      }
    }
  }

  public editTask(idTask: string) {
    this.emitEditTask.emit(idTask);
  }

  public getNameUserById(idUser: string): string {
    return this.userBoardService.getUserNameById(idUser).name;
  }

  public getColorUserById(idUser: string): string {
    let colorUser = this.userBoardService.getUserNameById(idUser).color;
    if (colorUser) {
      return colorUser;
    } else {
      return colorGrey;
    }
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

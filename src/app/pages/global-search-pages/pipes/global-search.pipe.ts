import { Pipe, PipeTransform } from '@angular/core';
import { BoardAndAllTasks } from './../../../shared/models/interfaces/interfaces-board';

@Pipe({
  name: 'globalSearch',
})
export class GlobalSearchPipe implements PipeTransform {
  transform(
    boards: BoardAndAllTasks[],
    searchText: string
  ): BoardAndAllTasks[] | null {
    if (boards && searchText.length >= 2) {
      let result = boards.filter(
        (board) =>
          board.taskTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          board.taskDescription
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          board.userLogin.toLowerCase().includes(searchText.toLowerCase())
      );
      return result;
    }
    return null;
  }
}

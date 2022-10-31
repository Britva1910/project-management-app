import { Component, Input } from '@angular/core';
import { Tasks } from '../../models/interfaces';
@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
})
export class ItemBoardComponent {
  @Input() item!: Tasks;
}

import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent /*implements OnInit*/ {
  constructor(private store: Store) {}

  @Input() idTask: string = '';

  public taskForm = {
    title: '',
    description: '',
  };
  /*
 ngOnInit(){

 }

  udapte() {
    const task = this.store.select(selectTaskById(idTask));
  }

 */
}

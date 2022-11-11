import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './board-page.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from './store/board.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffect } from './store/board.effect';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BoardContainerComponent } from './components/board-container/board-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserBoardService } from './services/user-board.service';
import { ItemBoardComponent } from './components/item-board/item-board.component';
import { DialogModule } from './components/dialog/dialog.module';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditTaskService } from './services/edit-task.service';
import { DragnDropService } from './services/dragn-drop.service';
import { DragHandleColumnComponent } from './components/drag-handle-column/drag-handle-column.component';
import { TranslocoModule } from '@ngneat/transloco';
const routes: Routes = [{ path: '', component: BoardPageComponent }];
@NgModule({
  declarations: [
    BoardPageComponent,
    BoardContainerComponent,
    ItemBoardComponent,
    EditTaskComponent,
    DragHandleColumnComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule.forChild(routes),
    StoreModule.forFeature('myboard', boardReducer),
    EffectsModule.forFeature([BoardEffect]),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    DragDropModule,
    FormsModule,
    MatExpansionModule,
    DialogModule,
    TranslocoModule,
  ],
  providers: [UserBoardService, EditTaskService, DragnDropService],
  exports: [EditTaskComponent],
})
export class BoardPageModule {}

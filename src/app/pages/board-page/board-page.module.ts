import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './board-page.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from './store/reducers/board.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffect } from './store/effects/board.effect';
import { BoardService } from './services/board.service';

const routes: Routes = [{ path: '', component: BoardPageComponent }];
@NgModule({
  declarations: [BoardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('myboard', boardReducer),
    EffectsModule.forFeature([BoardEffect]),
  ],
  providers: [BoardService],
})
export class BoardPageModule {}

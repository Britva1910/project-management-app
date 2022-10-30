import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './board-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: BoardPageComponent }];

@NgModule({
  declarations: [BoardPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class BoardPageModule {}

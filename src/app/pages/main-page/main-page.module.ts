import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { BoardListComponent } from './components/board-list/board-list.component';

const routes: Routes = [{ path: '', component: MainPageComponent }];
@NgModule({
  declarations: [
    MainPageComponent,
    SearchBarComponent,
    SortBarComponent,
    BoardListComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MainPageModule {}

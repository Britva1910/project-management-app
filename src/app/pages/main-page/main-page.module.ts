import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchPipe } from 'src/app/shared/pipes/search/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from 'src/app/shared/pipes/sort/sort.pipe';
import { MainPageService } from './services/main-page.service';
import { EditModalComponent } from './components/modal-window/edit-modal/edit-modal.component';
import { DialogModule } from './../../dialog/dialog.module';
const routes: Routes = [{ path: '', component: MainPageComponent }];
@NgModule({
  declarations: [
    MainPageComponent,
    SearchBarComponent,
    SortBarComponent,
    BoardListComponent,
    SearchPipe,
    SortPipe,
    EditModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  providers: [MainPageService],
})
export class MainPageModule {}

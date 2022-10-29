import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPagesComponent } from './shared/components/not-found-pages/not-found-pages.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'board',
    loadChildren: () =>
      import('./pages/board-page/board-page.module').then(
        (m) => m.BoardPageModule
      ),
  },
  { path: '**', component: NotFoundPagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

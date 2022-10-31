import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: AuthPageComponent }];
@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthPageModule {}

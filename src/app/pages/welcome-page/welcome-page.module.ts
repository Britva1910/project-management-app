import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AdvantageCardComponent } from './components/advantage-card/advantage-card.component';
import { MatButtonModule } from '@angular/material/button';
import { TeammateComponent } from './components/teammate-card/teammate.component';

const routes: Routes = [{ path: '', component: WelcomePageComponent }];

@NgModule({
  declarations: [
    WelcomePageComponent,
    AdvantageCardComponent,
    TeammateComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
})
export class WelcomePageModule {}

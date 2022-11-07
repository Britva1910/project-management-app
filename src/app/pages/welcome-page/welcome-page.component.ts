import { Component } from '@angular/core';
import { AdvantagesData } from '../../shared/models/interfaces/welcome-page';
import { advantages } from '../../shared/constant/advantages';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  advantagesData: AdvantagesData[] = advantages;
}

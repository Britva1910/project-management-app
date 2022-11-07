import { Component } from '@angular/core';
import {
  AdvantagesData,
  TeamData,
} from '../../shared/models/interfaces/welcome-page';
import { advantages } from '../../shared/constant/advantages';
import { teamData } from '../../shared/constant/team-data';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  advantagesData: AdvantagesData[] = advantages;

  teemData: TeamData[] = teamData;
}

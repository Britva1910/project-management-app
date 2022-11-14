/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AdvantagesData,
  TeamData,
} from '../../shared/models/interfaces/welcome-page';
import { teamData } from '../../shared/constant/team-data';
import { WelcomeDataService } from './services/welcome-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  private subTeam: Subscription;

  public advantagesData: AdvantagesData[];

  public teemData: TeamData[];

  constructor(private welcomeData: WelcomeDataService) {}

  ngOnInit() {
    this.sub = this.welcomeData
      .setAdvantagesData()
      .subscribe((data) => (this.advantagesData = data));
    this.subTeam = this.welcomeData
      .setTeamData(teamData)
      .subscribe((data) => (this.teemData = data));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subTeam.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { union } from '../../constant/union';
import { LoginService } from '../../../pages/auth-page/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public currentRoute: string;

  public bgColor: string;

  public checkLang: string = 'en';

  public languageButtonColor: string;

  public logoSource: string;

  public headerNavigation: boolean;

  public headerButtons: boolean;

  constructor(
    private router: Router,
    private location: Location,
    private translate: TranslocoService,
    private loginService: LoginService
  ) {
    router.events.subscribe(() => {
      if (location.path() != '') {
        this.currentRoute = location.path();
        if (
          this.currentRoute === union.welcome ||
          this.currentRoute === union.auth ||
          this.currentRoute === union.login ||
          this.currentRoute === union.signup
        ) {
          this.logoSource = union.darkLogo;
          this.bgColor = union.lightBgColor;
          this.languageButtonColor = union.darkColor;
          this.headerNavigation = false;
          this.headerButtons = true;
        } else {
          this.logoSource = union.lightLogo;
          this.bgColor = union.darkBgColor;
          this.languageButtonColor = union.lightColor;
          this.headerNavigation = true;
          this.headerButtons = false;
        }
      }
    });
  }

  public setLang(language: string) {
    this.translate.setActiveLang(language);
    this.checkLang = language;
  }

  public logOut() {
    this.loginService.logOut();
  }
}

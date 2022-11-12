import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { union } from '../../constant/union';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentRoute: string;

  bgColor: string;

  languageButtonColor: string;

  logoSource: string;

  headerNavigation: boolean;

  headerButtons: boolean;

  constructor(private router: Router, private location: Location) {
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
}

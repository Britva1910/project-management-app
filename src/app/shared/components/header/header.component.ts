import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
          this.currentRoute === '/welcome' ||
          this.currentRoute === '/auth/login'
        ) {
          this.logoSource = '../../../../assets/img/logo.png';
          this.bgColor = '#c2cdee';
          this.languageButtonColor = '#000';
          this.headerNavigation = false;
          this.headerButtons = true;
        } else {
          this.logoSource = '../../../../assets/img/light-logo.png';
          this.bgColor = '#00093c';
          this.languageButtonColor = '#fff';
          this.headerNavigation = true;
          this.headerButtons = false;
        }
      } else {
        this.currentRoute = 'home';
      }
    });
  }
}

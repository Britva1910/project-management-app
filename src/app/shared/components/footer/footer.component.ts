import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentRoute: string;

  imgSourceSv: string;

  imgSourceIv: string;

  imgSourceUl: string;

  imgSourceRS: string;

  bgColor: string;

  constructor(private router: Router, private location: Location) {
    router.events.subscribe(() => {
      if (location.path() != '') {
        this.currentRoute = location.path();
        if (this.currentRoute === '/welcome') {
          this.imgSourceSv = '../../../../assets/img/githubSv2 1.png';
          this.imgSourceIv = '../../../../assets/img/githubIv2 1.png';
          this.imgSourceUl = '../../../../assets/img/githubUl2 1.png';
          this.imgSourceRS = '../../../../assets/img/logoRSdark 1.png';
          this.bgColor = '#c2cdee';
        } else {
          this.imgSourceSv = '../../../../assets/img/githubSv.png';
          this.imgSourceIv = '../../../../assets/img/githubIv.png';
          this.imgSourceUl = '../../../../assets/img/githubUl.png';
          this.imgSourceRS = '../../../../assets/img/rs-school.png';
          this.bgColor = '#00093c';
        }
      } else {
        this.currentRoute = 'home';
      }
    });
  }
}

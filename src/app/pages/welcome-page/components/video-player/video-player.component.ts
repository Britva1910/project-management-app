import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import {
  LangVideoEnum,
  ScreenEnum,
} from 'src/app/shared/models/enums/screen-enum';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  private sub: Subscription[] = [];

  public videoId: string = LangVideoEnum.en;

  public widthVideo = ScreenEnum.small;

  public heightVideo = this.widthVideo / ScreenEnum.coefficient;

  public getScreenWidth = new BehaviorSubject<number>(0);

  constructor(private translocoService: TranslocoService) {
    this.sub.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.videoId = LangVideoEnum.en;
        } else {
          this.videoId = LangVideoEnum.ru;
        }
      })
    );
  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    this.getScreenWidth.next(window.innerWidth);
    this.sub.push(
      this.getScreenWidth.subscribe((value: number) => {
        if (value >= ScreenEnum.XXXL) this.settingVideo(ScreenEnum.XXL);
        if (value < ScreenEnum.XXXL && value >= ScreenEnum.XXL)
          this.settingVideo(ScreenEnum.XL);
        if (value < ScreenEnum.XXL && value >= ScreenEnum.XL)
          this.settingVideo(ScreenEnum.L);
        if (value < ScreenEnum.XL && value >= ScreenEnum.M)
          this.settingVideo(ScreenEnum.S);
        if (value < ScreenEnum.M && value >= ScreenEnum.XS)
          this.settingVideo(ScreenEnum.XXS);
        if (value < ScreenEnum.XS && value >= ScreenEnum.XXXS)
          this.settingVideo(ScreenEnum.small);
        if (value < ScreenEnum.XXXS && value >= ScreenEnum.mobile)
          this.settingVideo(ScreenEnum.min);
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth.next(window.innerWidth);
  }

  private settingVideo(widthScreen: number) {
    this.widthVideo = widthScreen;
    this.heightVideo = widthScreen / ScreenEnum.coefficient;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss'],
})
export class SortBarComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  public sortOrder: string;

  public rotateIcon: boolean;

  constructor(
    private mainPageService: MainPageService,
    private translocoService: TranslocoService
  ) {
    this.subscription.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.sortOrder = 'default';
        } else {
          this.sortOrder = 'умолчанию';
        }
      })
    );
  }

  ngOnInit() {
    this.subscription.push(
      this.mainPageService.sortOrder.subscribe(
        (data) => (this.sortOrder = data)
      )
    );
  }

  public sort() {
    this.translocoService.langChanges$.subscribe((lang) => {
      if (this.sortOrder === 'default' || this.sortOrder === 'умолчанию') {
        if (lang === 'en') {
          this.mainPageService.sortOrder.next('A-Z');
        } else {
          this.mainPageService.sortOrder.next('А-Я');
        }
        this.rotateIcon = false;
      } else if (this.sortOrder === 'A-Z' || this.sortOrder === 'А-Я') {
        if (lang === 'en') {
          this.mainPageService.sortOrder.next('Z-A');
        } else {
          this.mainPageService.sortOrder.next('Я-А');
        }
        this.rotateIcon = true;
      } else if (this.sortOrder === 'Z-A' || this.sortOrder === 'Я-А') {
        if (lang === 'en') {
          this.mainPageService.sortOrder.next('A-Z');
        } else {
          this.mainPageService.sortOrder.next('А-Я');
        }
        this.rotateIcon = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }
}

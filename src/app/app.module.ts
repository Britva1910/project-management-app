import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPagesComponent } from './shared/components/not-found-pages/not-found-pages.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderAddTokkenInterceptor } from './shared/interceptors/header-add-tokken.interceptor';
import { UrlInterceptor } from './shared/interceptors/url.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './shared/components/footer/footer.component';
import { appReducer } from './shared/store/app.reducer';
import { ModalConfirmComponent } from './shared/components/modal-confirm/modal-confirm.component';
import { HeaderAuthComponent } from './shared/components/header-auth/header-auth.component';
import { FooterAuthComponent } from './shared/components/footer-auth/footer-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPagesComponent,
    HeaderComponent,
    FooterComponent,
    ModalConfirmComponent,
    HeaderAuthComponent,
    FooterAuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ appState: appReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderAddTokkenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {FlxProcessModule} from 'flowx-process-renderer';
import {ButtonModule, CardModule, IconModule, SelectModule} from 'paperflow-web-components';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthInterceptor} from './auth.interceptor';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexModule} from '@angular/flex-layout';
import {logoutIcon} from './services/icons';
import {MyCustomComponent} from './components/my-custom-component/my-custom.component';
import {MainPage} from './components/main/main.page';
import {HeaderComponent} from './components/header/header.component';
import {AuthConfigModule} from './modules/auth/auth.module';
import {ErrorInterceptor} from './modules/auth/error.interceptor';

@NgModule({
  declarations: [AppComponent, MyCustomComponent, HeaderComponent, MainPage],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    FlxProcessModule.forRoot({
      components: {},
      services: {},
    }),
    IconModule.forRoot({
      icons: [
        logoutIcon
      ]
    }),
    AuthConfigModule,
    ButtonModule,
    CardModule,
    SelectModule
  ],
  providers: [
    {provide: 'BASE_URL', useValue: environment.baseUrl},
    {provide: 'STATIC_ASSETS_URL', useValue: environment.staticAssetsPath},
    {provide: 'PROCESS_API_PATH', useValue: environment.processApiPath},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

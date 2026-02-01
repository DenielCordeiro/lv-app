/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideNgxWebstorage, withLocalStorage, withSessionStorage } from 'ngx-webstorage';

import { appRoutes } from './app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideNgxWebstorage(
      withLocalStorage(),
      withSessionStorage()
    )
  ]
}).catch(console.error);

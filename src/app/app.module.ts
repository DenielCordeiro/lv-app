import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderNewsletterComponent } from './newsletter/header-newsletter/header-newsletter.component';
import { LoginComponent } from './newsletter/header-newsletter/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsletterComponent,
    HeaderNewsletterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

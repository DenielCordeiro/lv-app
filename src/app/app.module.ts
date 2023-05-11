import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/login/auth.service';

import { AppComponent } from './app.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { HeaderNewsletterComponent } from './newsletter/header-newsletter/header-newsletter.component';
import { LoginComponent } from './newsletter/header-newsletter/login/login.component';

import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './guards/auth-guards';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './newsletter/header-newsletter/register/register.component';
import { HeaderProductsComponent } from './products/header-products/header-products.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyComponent } from './product/buy/buy.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsletterComponent,
    HeaderNewsletterComponent,
    LoginComponent,
    ProductsComponent,
    RegisterComponent,
    HeaderProductsComponent,
    ProductComponent,
    DashboardComponent,
    BuyComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

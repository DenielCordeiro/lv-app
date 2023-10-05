import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as d3 from 'd3';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/login/auth.service';
import { AuthGuard } from './guards/auth-guards';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { NewsletterComponent } from './newsletter/newsletter.component';
import { HeaderNewsletterComponent } from './newsletter/header-newsletter/header-newsletter.component';
import { LoginComponent } from './newsletter/header-newsletter/login/login.component';
import { RegisterComponent } from './newsletter/header-newsletter/register/register.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { BuyComponent } from './product/buy/buy.component';
import { AboutComponent } from './about/about.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VerticalChartComponent } from './dashboard/charts/vertical-chart/vertical-chart.component';
import { UsersComponent } from './users/users.component';
import { NewsComponent } from './newsletter/news/news.component';
import { CarouselComponent } from './newsletter/carousel/carousel.component';
import { CollectionsComponent } from './newsletter/collections/collections.component';
import { BodyNewsletterComponent } from './newsletter/body-newsletter/body-newsletter.component';
import { AddComponent } from './products/add/add.component';
import { UpdateComponent } from './products/update/update.component';
import { DeleteComponent } from './products/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsletterComponent,
    HeaderNewsletterComponent,
    LoginComponent,
    ProductsComponent,
    RegisterComponent,
    ProductComponent,
    DashboardComponent,
    BuyComponent,
    NavbarComponent,
    VerticalChartComponent,
    AboutComponent,
    UsersComponent,
    NewsComponent,
    CarouselComponent,
    CollectionsComponent,
    BodyNewsletterComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxChartsModule,
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

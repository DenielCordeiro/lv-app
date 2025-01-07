import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxWebstorageModule } from "ngx-webstorage";

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth-guards';

import { AppComponent } from './app.component';

import { NewsletterComponent } from './newsletter/newsletter.component';
import { RegisterComponent } from './header/register/register.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { AddOrEditComponent } from './products/add-or-edit/add-or-edit.component';
import { BuyComponent } from './cart/buy/buy.component';
import { DeleteComponent } from './products/delete/delete.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VerticalChartComponent } from './dashboard/charts/vertical-chart/vertical-chart.component';
import { UsersComponent } from './users/users.component';
import { NewsComponent } from './newsletter/news/news.component';
import { CarouselComponent } from './newsletter/carousel/carousel.component';
import { CollectionsComponent } from './newsletter/collections/collections.component';
import { BodyNewsletterComponent } from './newsletter/body-newsletter/body-newsletter.component';

import { AboutComponent } from './about/about.component';
import { LoginComponent } from './header/login/login.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './header/menu/menu.component';
import { DesktopMenuComponent } from './header/menu/desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from './header/menu/mobile-menu/mobile-menu.component';
import { CartComponent } from './cart/cart.component';
import { AddOrRemoveCartComponent } from './cart/add-or-remove-cart/add-or-remove-cart.component';
import { InterfacesComponent } from './interfaces/interfaces/interfaces.component';
import { AddOrEditImageComponent } from './newsletter/add-or-edit-image/add-or-edit-image.component';
import { DeleteImageComponent } from './newsletter/delete-image/delete-image.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsletterComponent,
    HeaderComponent,
    LoginComponent,
    ProductsComponent,
    RegisterComponent,
    ProductComponent,
    DashboardComponent,
    BuyComponent,
    VerticalChartComponent,
    AboutComponent,
    UsersComponent,
    NewsComponent,
    CarouselComponent,
    CollectionsComponent,
    BodyNewsletterComponent,
    AddOrEditComponent,
    DeleteComponent,
    MenuComponent,
    DesktopMenuComponent,
    MobileMenuComponent,
    CartComponent,
    AddOrRemoveCartComponent,
    InterfacesComponent,
    AddOrEditImageComponent,
    DeleteImageComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxChartsModule,
    MatDialogModule,
    MatSelectModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

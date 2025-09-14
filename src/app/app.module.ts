import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth-guards';

import { LocalStorageService } from 'ngx-webstorage';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { DesktopMenuComponent } from './header/menu/desktop-menu/desktop-menu.component';
import { LoginComponent } from './header/login/login.component';
import { MenuComponent } from './header/menu/menu.component';

import { NewsletterComponent } from './newsletter/newsletter.component';
import { RegisterComponent } from './header/register/register.component';
import { NewsComponent } from './newsletter/news/news.component';
import { AddOrEditImageComponent } from './newsletter/add-or-edit-image/add-or-edit-image.component';
import { DeleteImageComponent } from './newsletter/delete-image/delete-image.component';
import { CollectionsComponent } from './newsletter/collections/collections.component';
import { CarouselComponent } from './newsletter/carousel/carousel.component';
import { FooterNewsletterComponent } from './newsletter/footer-newsletter/footer-newsletter.component';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { AddOrEditProductComponent } from './products/add-or-edit-product/add-or-edit-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';

import { UsersComponent } from './users/users.component';

import { AboutComponent } from './about/about.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VerticalChartComponent } from './dashboard/charts/vertical-chart/vertical-chart.component';

import { CartComponent } from './cart/cart.component';
import { PaymentsComponent } from './cart/payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DesktopMenuComponent,
    LoginComponent,
    NewsletterComponent,
    RegisterComponent,
    NewsComponent,
    AddOrEditImageComponent,
    DeleteImageComponent,
    CollectionsComponent,
    CarouselComponent,
    FooterNewsletterComponent,
    ProductsComponent,
    ProductComponent,
    AboutComponent,
    UsersComponent,
    AddOrEditProductComponent,
    DeleteProductComponent,
    MenuComponent,
    CartComponent,
    DashboardComponent,
    VerticalChartComponent,
    PaymentsComponent,
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
    MatTabsModule
  ],
  providers: [
    AuthGuard,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

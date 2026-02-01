import { Routes } from '@angular/router';

import { DashboardComponent } from './app/dashboard/dashboard.component';
import { NewsletterComponent } from './app/newsletter/newsletter.component';
import { RegisterComponent } from './app/header/register/register.component';
import { UsersComponent } from './app/users/users.component';
import { CartComponent } from './app/cart/cart.component';
import { ProductsComponent } from './app/products/products.component';
import { ProductComponent } from './app/product/product.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'newsletter',
    pathMatch: 'full',
  },
  {
    path: 'navbar',
    component: DashboardComponent,
  },
  {
    path: 'newsletter',
    component: NewsletterComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile/:user_id',
    component: UsersComponent,
  },
  {
    path: 'cart/:user_id',
    component: CartComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product/:product_id',
    component: ProductComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'newsletter',
  }
];

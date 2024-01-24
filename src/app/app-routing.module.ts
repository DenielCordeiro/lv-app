import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guards';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { RegisterComponent } from './newsletter/header-newsletter/register/register.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: "navbar",
    component: DashboardComponent,
  },
  {
    path: "newsletter",
    component: NewsletterComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "profile/:id",
    component: UsersComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "product/:id",
    component: ProductComponent,
  },
  {
    path: '**',
    redirectTo: '/newsletter',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

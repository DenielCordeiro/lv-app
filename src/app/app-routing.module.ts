import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guards';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { RegisterComponent } from './header/register/register.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/newsletter',
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
    path: "profile/:user_id",
    component: UsersComponent,
  },
  {
    path: "cart/:user_id",
    component: CartComponent,
  },
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "product/:product_id",
    component: ProductComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
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

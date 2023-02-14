import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guards';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: "newsletter",
    component: NewsletterComponent,
  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "product",
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

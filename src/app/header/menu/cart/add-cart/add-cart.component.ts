import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.sass']
})
export class AddCartComponent {
  product!: ProductModel;
  id: number | undefined = 0;

  constructor(private productService: ProductsService) {}

  addToCart(): void {
    if (this.product.user != undefined)
    {
      this.id = this.product.user;
      // this.productService.updateProduct(this.product, this.id)
      //   .then(result => {
      //     console.log(result);

      //   })
      //   .catch(error => {
      //     console.log(error);

      //   })
      //   .finally(() => {
      //     console.log('Produto adicionado ao Carrinho');

      //   })
    }
  }
}

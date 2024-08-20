import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.sass']
})
export class AddCartComponent {
  model!: ProductModel;
  id: number | undefined = 0;

  constructor(private productService: ProductsService) {}

  addToCart(): void {
    if (this.model.user != undefined)
    {
      this.id = this.model.user;
      this.productService.updateProduct(this.model, this.id)
        .then(result => {
          console.log(result);

        })
        .catch(error => {
          console.log(error);

        })
        .finally(() => {
          console.log('Produto adicionado ao Carrinho');

        })
    }
  }
}

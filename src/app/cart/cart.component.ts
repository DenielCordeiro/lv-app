import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart/cart.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent {
  form!: FormGroup;
  product!: Product;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
  ) {}

  buildingForm(): FormGroup {
    this.form = this.formBuilder.group({
      "description": this.product.description,
      "file": this.product.file,
      "groups": this.product.groups,
      "name": this.product.name,
      "type": this.product.type,
      "valor": this.product.valor,
      "_id": this.product._id,
    });

    this.form.updateValueAndValidity();

    return this.form
  }

  saveCart(): void {
    const product = this.buildingForm().value;
    console.log('producto: ', product);
  }

  clearningCart(): void {
    const product = this.buildingForm().value;

    this.cartService.clearCart(product._id)
      .then(result => {
        console.log(result);

      })
      .catch(error => {
        console.log(error);

      })
      .finally(() => {
        console.log('Você removeu este item do carrinho!');
      });
  }
}

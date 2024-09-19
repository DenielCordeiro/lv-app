import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  form!: FormGroup;
  product!: ProductModel;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
  ) {}


  ngOnInit(): void {
    // console.log('produtos: ', this.loadedProducts);
    console.log('inicou o carrinho');

  }


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

    this.productService.clearCart(product._id)
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

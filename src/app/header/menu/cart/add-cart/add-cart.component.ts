import { Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.sass']
})
export class AddCartComponent {
  @Input() product!: Product;
  inOrOutOfTheCart: boolean = false;
  currentCountValue: number = 0;

  constructor( public route: ActivatedRoute ) {
    console.log('valor da contagem: ', this.currentCountValue);
  }

  addingToCart(): void {
    const products = [];

    this.inOrOutOfTheCart = true;

    if(this.product !== null) {
      products.push(this.product);
    }
    this.currentCountValue = this.countControl(this.inOrOutOfTheCart, this.currentCountValue);

    console.log('valor da contagem: ',  this.currentCountValue);
  }

  removingProductFromCart(): void {
    console.log('removeu do carrinho');
    this.inOrOutOfTheCart = false;
    this.currentCountValue = this.countControl(this.inOrOutOfTheCart, this.currentCountValue);
    console.log('valor da contagem: ',  this.currentCountValue);
  }

  countControl(addOrRemove: boolean, currentValue: number): number {
    if (addOrRemove == true) {
      currentValue += 1;
    } else {
      currentValue -= 1;
    }

    return currentValue;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../services/products/products.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  routeId: number | undefined = undefined;
  items!: ProductModel;

  constructor(
    public route: ActivatedRoute,
    public productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.routeId = this.route.snapshot.params["id"];

    if (this.routeId !== undefined) {
      this.getProductSelected(this.routeId);
    } else {
      alert("seguinte chefia, deu erro! não trouxe id pela rota");
    }
  }

  getProductSelected(id: number) {
    this.productsService.getProduct(id);
    // this.items = this.productsService.getProducts(id);
  }

  updateModal() {}
  deleteModal() {}
}

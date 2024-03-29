import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ProductsService } from './../services/products/products.service';
import { ProductModel } from '../models/product.model';
import { MelhorEnvioService } from '../services/melhor-envio/melhor-envio.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  form!: FormGroup;
  routeId: number | undefined = undefined;
  products: ProductModel[] = [];
  product!: ProductModel;

  constructor(
    public route: ActivatedRoute,
    public productsService: ProductsService,
    public melhorEnvio: MelhorEnvioService
  ) {}

  ngOnInit() {
    this.routeId = this.route.snapshot.params["product_id"];

    if (this.routeId !== undefined) {
      this.getProductSelected(this.routeId);
    } else {
      alert("seguinte chefia, deu erro! não trouxe id pela rota");
    }
  }

  getProductSelected(id: number): void {
    this.productsService.getProduct(id)
      .then(data => {
        if(data == null || undefined) {
          alert("[Atenção]: Não existe nenhum produto a venda!")
        } else {
          this.products.push(data);
          this.product = this.products[0];
        }
      })
      .catch(Error => {
        alert('ERRO: não conseguiu trazer os produtos');
        console.log(Error);
      })
  }

  updateModal(): void {}
  deleteModal(): void {}

  searchShipping(): void {
    this.melhorEnvio.getShipping('13308197');
  }
}

import { Shipping } from './../models/shipping.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from './../services/products/products.service';
import { ProductModel } from '../models/product.model';
import { MelhorEnvioService } from '../services/melhor-envio/melhor-envio.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  searchForm!: FormGroup;
  products: ProductModel[] = [];
  shippings: Shipping[] = [];
  product!: ProductModel;
  routeId: number | undefined = undefined;
  postalCode: string = '';

  constructor(
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public productsService: ProductsService,
    public melhorEnvio: MelhorEnvioService
  ) { }

  ngOnInit(): void {
    this.routeId = this.route.snapshot.params["product_id"];

    if (this.routeId !== undefined) {
      this.getProductSelected(this.routeId);
    } else {
      alert("seguinte chefia, deu erro! não trouxe id pela rota");
    }

    this.buildingForm();
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

  buildingForm(): void {
    this.searchForm = this.formBuilder.group({
      "postalCode": [null],
    });
  }

  updateModal(id: number | undefined): void {}
  deleteModal(id: number | undefined): void {}

  searchShipping(): void {
    const postalCodeNumber = this.searchForm?.value;
    this.postalCode = String(postalCodeNumber?.postalCode)

    if (this.postalCode == 'null') {

      alert("[Atenção]: Precisa digitar algum número de CEP!");

    } else {
      this.melhorEnvio.getShipping(this.postalCode)
        .then(result => {
          const shippings = result?.data;
          const prices: number[] = [];
          let smallPrice!: number;

          shippings.forEach((data: Shipping) => {

            if (data.price != null && (data.company.name == "Jadlog" || data.company.name == "Correios")) {
              prices.push(data.price)
              smallPrice = Math.min(...prices.map(Number));

              if (data.price == smallPrice) {
                this.shippings.pop();
                this.shippings.push(data);

                this.product.shipping = {
                  name: data.name,
                  price: Number(data.price),
                  postalCode: postalCodeNumber?.postalCode,
                }
              }
            }
          });

          console.log('prosuto: ', this.product);

        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}

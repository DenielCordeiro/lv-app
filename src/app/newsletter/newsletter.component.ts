import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.sass']
})
export class NewsletterComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getingProducts();
  }

  getingProducts(): Product[] {
    this.productsService.getProducts()
      .then(data => {

        if(data == null || data == undefined) {
          alert("[Atenção]: Não existe nenhum produto a venda!")
        } else {

          data.forEach(product => {
            this.products.push(product);
          });
        }
      })
      .catch(error => {
        alert('ERRO: não conseguiu trazer os produtos');
        console.log(error);
      });

    return this.products;
  }
}

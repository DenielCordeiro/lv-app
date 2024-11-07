import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
  @Input() dataProducts: Product[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('Produtos: ', this.dataProducts);
  }

}

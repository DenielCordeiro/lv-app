import { Component, Input, OnInit } from '@angular/core';
import { NewsletterService } from 'src/app/services/newsletter/newsletter.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {
  @Input() dataProducts: Product[] = [];

  constructor(private newsletterService: NewsletterService ) {}

  ngOnInit(): void {
    console.log('Produtos: ', this.dataProducts);
  }

  gettingImagesNewsletter(): void {
    this.newsletterService.getImages();
  }

  updattingImage(imageUrl: string, productId: string, optionImage: boolean): void {

    const objtest = {
      a: imageUrl,
      b: productId,
    }

    if (optionImage == true) {
      this.newsletterService.updateImageNews(objtest);
    } else {
      this.newsletterService.updateImageNews(objtest);

    }

  }

}

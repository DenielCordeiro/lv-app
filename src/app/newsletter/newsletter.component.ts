import { Component, OnInit } from '@angular/core';
import { NewsletterService } from './../services/newsletter/newsletter.service';
import { News } from '../interfaces/news.interface';
import { NewsComponent } from './news/news.component';
import { CollectionsComponent } from './collections/collections.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterNewsletterComponent } from './footer-newsletter/footer-newsletter.component';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    NewsComponent,
    CollectionsComponent,
    CarouselComponent,
    FooterNewsletterComponent
  ],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.sass'],
})
export class NewsletterComponent implements OnInit {
  images: News[] = [];
  news: News = {};
  collection: News[] = [];
  carousel: News[] = [];

  constructor(
    private newsletterService: NewsletterService,
  ) {}

  ngOnInit(): void {
    // this.gettingImages();
  }
  
  gettingImages(): News[] {
    this.newsletterService.getImages()
      .then(data => {
        data.forEach(images => {
          this.images.push(images);
        });

        this.filterImages(this.images);
      })
      .catch(error => {
        console.error('Erro para carregar os dados: ', error);
      });

    return this.images;
  }

  filterImages(images: News[]): void {
    images.forEach(image => {
      if (image.type == "News") {
        this.news = image;
      }

      if (image.type == "Carousel") {
        this.carousel.push(image);
      }

      if (image.type == "Collection") {
        this.collection.push(image);
      }
    });
  }
}

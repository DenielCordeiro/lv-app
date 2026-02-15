import { Component, OnInit } from '@angular/core';
import { NewsletterService } from './../services/newsletter/newsletter.service';
import { ToastsService } from '../services/toasts/toasts.service';
import { News } from '../interfaces/news.interface';
import { ToastType } from '../enums/toast-type.enum';
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
  news!: News;
  collection: News[] = [];
  carousel: News[] = [];

  constructor(
    private newsletterService: NewsletterService,
    private toatsService: ToastsService,
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
        this.toatsService.show(
          ToastType.ERROR,
          'Não foi possível carregar sua Newslleter'
        )
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

import { NewsletterService } from './../services/newsletter/newsletter.service';
import { Component, OnInit } from '@angular/core';
import { News } from '../interfaces/news.interface';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.sass']
})
export class NewsletterComponent implements OnInit {
  images: News[] = [];
  news!: News;
  collection: News[] = [];
  carousel: News[] = [];

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit(): void {
    this.gettingImages();
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
        alert('ERRO: Não foi possível carregar as imagens');
        console.log(error);
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

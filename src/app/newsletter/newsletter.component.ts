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

  constructor(private newsletterService: NewsletterService) {}

  ngOnInit(): void {
  }

  getingImages(): News[] {
    this.newsletterService.getImages()
      .then(data => {

        if(data == null || data == undefined) {
          alert("[Atenção]: Não existe nenhum produto a venda!")
        } else {

          data.forEach(images => {
            this.images.push(images);
          });
        }
      })
      .catch(error => {
        alert('ERRO: Não foi possível carregar as imagens');
        console.log(error);
      });

    return this.images;
  }
}

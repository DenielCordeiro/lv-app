import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor() { }

  public getImages(): void {
    console.log('Buscando Imagens para newsletter');

  }

  public updateImageNews(newsData: Object) {
    console.log('Objeto news', newsData);
  }
}

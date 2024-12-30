import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseAPI } from 'src/app/interfaces/base-api.interface';
import { BaseCrud } from 'src/app/interfaces/base-crud.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudNewsletterService<T extends BaseCrud> {
  http!: HttpClient;
  route!: string;

  constructor(
    http: HttpClient,
    route: string,
  ) {
    this.http = http;
    this.route = environment.api + route;
  }

  public getImages(): Promise<T[]> {
    return lastValueFrom(this.http.get<BaseAPI<T>>(this.route))
      .then(result => {
        return this.handleResponse(result) as T[];
      });
  }

  public createImage(news: FormData): void {
    console.log('criando News', news);
  }

  public updateImage(news: FormData) {
    console.log('Objeto news', news);
  }

  public deleteImage(news_id: Object) {
    console.log('Objeto news', news_id);
  }

  public handleResponse(response: BaseAPI<T>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseAPI } from 'src/app/interfaces/base-api.interface';
import { BaseCrud } from 'src/app/interfaces/base-crud.interface';
import { Review } from 'src/app/interfaces/review.interface';
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

  public createImage(news: FormData): Promise<T[]> {
    return lastValueFrom(this.http.post<BaseAPI<T>>(this.route, news))
      .then(result => {
        return this.handleResponse(result) as T[];
      });
  }

  public updateImage(news: FormData, news_id: number): Promise<T[]> {
    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/${news_id}`, news))
      .then(result => {
        return this.handleResponse(result) as T[];
      });
  }

  public deleteImage(news_id: number): Promise<T> {
    return lastValueFrom(this.http.delete<BaseAPI<T>>(`${this.route}/${news_id}`))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public getReviews(): Promise<T[]> {
    return lastValueFrom(this.http.get<BaseAPI<T>>(`${this.route}/reviews`))
      .then(result => {
        return this.handleResponse(result) as T[];
      });
  }

  public createReview(review: Review): Promise<T> {
    return lastValueFrom(this.http.post<BaseAPI<T>>(`${this.route}/reviews`, review))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public updateReview(review: Review, review_id: number): Promise<T> {
    return lastValueFrom(this.http.put<BaseAPI<T>>(`${this.route}/reviews/${review_id}`, review))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public deleteReview(review_id: number): Promise<T> {
    return lastValueFrom(this.http.delete<BaseAPI<T>>(`${this.route}/reviews/${review_id}`))
      .then(result => {
        return this.handleResponse(result) as T;
      });
  }

  public handleResponse(response: BaseAPI<T>) {
    if(response) {
      return response.data;
    } else {
      throw new Error("Api 200, mas success falso!");
    }
  }
}
